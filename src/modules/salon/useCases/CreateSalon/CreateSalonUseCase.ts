import { inject, injectable } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
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
            throw new ApiError("User haven't permition.", 401);
        }

        const adress = await this.adressRepository.findById(adress_id);

        if (!adress) {
            throw new ApiError("Address not found.", 400);
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
