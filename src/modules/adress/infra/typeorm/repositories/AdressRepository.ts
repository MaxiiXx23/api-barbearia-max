import { Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import { ICreateAdressDTO } from "../../../dtos/ICreateAdressDTO";
import { IAdressRepository } from "../../../repositories/IAdressRepository";
import { Adress } from "../entities/Adress";

class AdressRepository implements IAdressRepository {
    private repository: Repository<Adress>;

    constructor() {
        this.repository = dataSource.getRepository(Adress);
    }

    async create({
        cep,
        public_place,
        number,
        complement,
        city,
        state,
        country,
        reference,
        user_id,
    }: ICreateAdressDTO): Promise<void> {
        const adress = this.repository.create({
            cep,
            public_place,
            number,
            complement,
            city,
            state,
            country,
            reference,
            user_id,
        });

        await this.repository.save(adress);
    }

    async getAddresses(id: string): Promise<Adress[]> {
        const address = await this.repository.find({
            where: {
                user_id: id,
            },
        });
        return address;
    }

    async update({
        id,
        cep,
        public_place,
        number,
        complement,
        city,
        state,
        country,
        reference,
        user_id,
    }: ICreateAdressDTO): Promise<Adress> {
        const adress = this.repository.create({
            id,
            cep,
            public_place,
            number,
            complement,
            city,
            state,
            country,
            reference,
            user_id,
        });
        await this.repository.save(adress);
        return adress;
    }

    async findById(id: string): Promise<Adress> {
        const adress = await this.repository.findOneBy({ id });
        return adress;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { AdressRepository };
