import { injectable, inject } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new ApiError("User does not exists.", 400);
        }

        return user;
    }
}

export { ProfileUserUseCase };
