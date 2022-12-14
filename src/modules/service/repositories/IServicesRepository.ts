import { ICreateServiceDTO } from "../dtos/ICreateServiceDTO";
import { Service } from "../infra/typeorm/entities/Service";

interface IServicesRepository {
    create(data: ICreateServiceDTO): Promise<Service>;
    findById(id: string): Promise<Service>;
    findByName(name: string): Promise<Service>;
}

export { IServicesRepository };
