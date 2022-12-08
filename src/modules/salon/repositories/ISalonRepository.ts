import { ICreateSalonDTO } from "../dtos/ICreateSalonDTO";
import { Salon } from "../infra/typeorm/entities/Salon";

interface ISalonRepository {
    create(data: ICreateSalonDTO): Promise<Salon>;
    update(data: ICreateSalonDTO): Promise<Salon>;
    findById(id: string): Promise<Salon[]>;
    findToUpdateById(id: string): Promise<Salon>;
}

export { ISalonRepository };
