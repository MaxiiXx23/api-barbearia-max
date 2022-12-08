import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IAdressRepository } from "../../../adress/repositories/IAdressRepository";
import { ICreateSalonDTO } from "../../dtos/ICreateSalonDTO";
import { Salon } from "../../infra/typeorm/entities/Salon";
import { ISalonRepository } from "../../repositories/ISalonRepository";

@injectable()
class CreateSalonUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("SalonRepository")
        private salonRepository: ISalonRepository,

        @inject("AdressRepository")
        private adressRepository: IAdressRepository
    ) {}

    async execute({
        id_user,
        name,
        slogan,
        adress_id,
    }: ICreateSalonDTO): Promise<Salon> {
        const user = await this.usersRepository.findById(id_user);

        if (!user.isAdmin) {
            throw new Error("User haven't permition.");
        }

        const adress = await this.adressRepository.findById(adress_id);

        if (!adress) {
            throw new Error("Address not found.");
        }

        const salon = await this.salonRepository.create({
            name,
            slogan,
            adress_id,
        });

        return salon;
    }
}

export { CreateSalonUseCase };
