import { inject, injectable } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IRequestAdressDTO } from "../../dtos/IRequestAdressDTO";
import { IAdressRepository } from "../../repositories/IAdressRepository";

@injectable()
class UpdateAdressUseCase {
    constructor(
        @inject("AdressRepository")
        private adressRepository: IAdressRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        user_id,
        id,
        cep,
        public_place,
        number,
        complement,
        city,
        state,
        country,
        reference,
    }: IRequestAdressDTO) {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new ApiError("User does not exists.", 400);
        }

        const adress = await this.adressRepository.findById(id);

        if (!adress) {
            throw new ApiError("Address does not exists.", 400);
        }

        adress.cep = cep;
        adress.public_place = public_place;
        adress.number = Number(number);
        adress.complement = complement;
        adress.city = city;
        adress.state = state;
        adress.country = country;
        adress.reference = reference;
        adress.user_id = user_id;

        const adressUpdated = await this.adressRepository.update(adress);
        return adressUpdated;
    }
}

export { UpdateAdressUseCase };
