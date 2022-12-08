import { Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import { ICreateSalonDTO } from "../../../dtos/ICreateSalonDTO";
import { ISalonRepository } from "../../../repositories/ISalonRepository";
import { Salon } from "../entities/Salon";

class SalonRepository implements ISalonRepository {
    private repository: Repository<Salon>;

    constructor() {
        this.repository = dataSource.getRepository(Salon);
    }

    async create({ name, slogan, adress_id }: ICreateSalonDTO): Promise<Salon> {
        const salon = this.repository.create({
            name,
            slogan,
            adress_id,
        });

        await this.repository.save(salon);
        return salon;
    }

    async update({
        id,
        name,
        slogan,
        adress_id,
    }: ICreateSalonDTO): Promise<Salon> {
        const salon = this.repository.create({
            id,
            name,
            slogan,
            adress_id,
        });

        await this.repository.save(salon);
        return salon;
    }

    async findById(id: string): Promise<Salon[]> {
        const salon = await this.repository.find({
            where: { id },
            relations: {
                adress: true,
            },
        });
        return salon;
    }

    async findToUpdateById(id: string): Promise<Salon> {
        const salon = await this.repository.findOneBy({ id });
        return salon;
    }
}

export { SalonRepository };
