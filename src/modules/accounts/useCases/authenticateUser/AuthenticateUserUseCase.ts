import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import { auth } from "../../../../config/auth";
import { ApiError } from "../../../../shared/error/ApiError";
import { IRequestDTO } from "../../dtos/IRequestDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface ITokenResponse {
    user: {
        name: string;
        email: string;
        photo: string;
        phone: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequestDTO): Promise<ITokenResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new Error("E-mail or Password is invalid");
        }

        const passwordCompared = await compare(password, user.password);

        if (!passwordCompared) {
            throw new ApiError("E-mail or Password is invalid", 401);
        }

        const token = sign({}, auth.secret_key_JWT, {
            subject: user.id,
            expiresIn: auth.expires_in_token,
        });

        const tokenResponse: ITokenResponse = {
            user: {
                email: user.email,
                name: user.name,
                photo: user.photo_url(),
                phone: user.phone,
            },
            token,
        };
        return tokenResponse;
    }
}

export { AuthenticateUserUseCase };
