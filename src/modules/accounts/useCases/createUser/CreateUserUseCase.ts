import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        email,
        password,
        name,
        phone,
    }: ICreateUserDTO): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        if (user) {
            throw new ApiError("User already exists.", 400);
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            email,
            password: passwordHash,
            name,
            phone,
        });
    }
}
export { CreateUserUseCase };
