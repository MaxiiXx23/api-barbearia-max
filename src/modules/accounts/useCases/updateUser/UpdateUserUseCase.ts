import { injectable, inject } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    id: string;
    name: string;
    phone: string;
}

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ id, name, phone }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new ApiError("User not found.", 400);
        }

        user.name = name;
        user.phone = phone;

        const userUpdated = await this.usersRepository.update({
            id,
            name,
            phone,
        });

        return userUpdated;
    }
}

export { UpdateUserUseCase };
