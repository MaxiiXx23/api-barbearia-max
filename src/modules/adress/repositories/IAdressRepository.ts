import { ICreateAdressDTO } from "../dtos/ICreateAdressDTO";
import { Adress } from "../infra/typeorm/entities/Adress";

interface IAdressRepository {
    create(data: ICreateAdressDTO): Promise<void>;
    getAddresses(id: string): Promise<Adress[]>;
    update(data: ICreateAdressDTO): Promise<Adress>;
    findById(id: string): Promise<Adress>;
    delete(id: string): Promise<void>;
}

export { IAdressRepository };
