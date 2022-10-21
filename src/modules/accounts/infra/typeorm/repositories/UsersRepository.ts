import { Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = dataSource.getRepository(User);
    }

    async create({ email, password, name }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            email,
            password,
            name,
        });
        await this.repository.save(user);
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOneBy({
            email,
        });
        return user;
    }
}

export { UsersRepository };
