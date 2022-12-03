import { ICreateAdressDTO } from "../dtos/ICreateAdressDTO";
import { Adress } from "../infra/typeorm/entities/Adress";

interface IAdressRepository {
    create(data: ICreateAdressDTO): Promise<void>;
    findById(id: string): Promise<Adress>;
    update(data: ICreateAdressDTO): Promise<Adress>;
    delete(id: string): Promise<void>;
}

export { IAdressRepository };
