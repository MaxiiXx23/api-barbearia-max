import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { Adress } from "../../infra/typeorm/entities/Adress";
import { IAdressRepository } from "../../repositories/IAdressRepository";

interface IRequest {
    id_user: string;
    id: string;
}
@injectable()
class GetAddressesUseCase {
    constructor(
        @inject("AdressRepository")
        private adressRepository: IAdressRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ id_user, id }: IRequest): Promise<Adress[]> {
        const user = await this.usersRepository.findById(id_user);

        if (!user) {
            throw new Error("User does not exists.");
        }

        const addresses = await this.adressRepository.getAddresses(id);
        return addresses;
    }
}

export { GetAddressesUseCase };
