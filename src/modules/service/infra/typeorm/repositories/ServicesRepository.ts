import { Repository } from "typeorm";

import { dataSource } from "../../../../../shared/infra/typeorm";
import { ICreateServiceDTO } from "../../../dtos/ICreateServiceDTO";
import { IServicesRepository } from "../../../repositories/IServicesRepository";
import { Service } from "../entities/Service";

class ServicesRepository implements IServicesRepository {
    private repository: Repository<Service>;
    constructor() {
        this.repository = dataSource.getRepository(Service);
    }

    async create(data: ICreateServiceDTO): Promise<Service> {
        const service = this.repository.create(data);
        await this.repository.save(service);
        return service;
    }

    async findById(id: string): Promise<Service> {
        const service = this.repository.findOneBy({ id });
        return service;
    }

    async findByName(name: string): Promise<Service> {
        const service = this.repository.findOneBy({ name });
        return service;
    }
}

export { ServicesRepository };
