import { injectable, inject } from "tsyringe";

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
            throw new Error("User does not exists.");
        }

        return user;
    }
}

export { ProfileUserUseCase };
