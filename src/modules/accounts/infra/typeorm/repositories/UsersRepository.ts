import { Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../../dtos/IUpdateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = dataSource.getRepository(User);
    }

    async create({
        email,
        password,
        name,
        phone,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            email,
            password,
            name,
            phone,
        });
        await this.repository.save(user);
    }

    async update({ id, name, phone }: IUpdateUserDTO): Promise<User> {
        const user = await this.repository.findOneBy({ id });
        const userUpdated = await this.repository.save({
            id: user.id,
            name,
            phone,
        });
        return userUpdated;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({
            email,
        });
        return user;
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({
            id,
        });
        return user;
    }
}

export { UsersRepository };
