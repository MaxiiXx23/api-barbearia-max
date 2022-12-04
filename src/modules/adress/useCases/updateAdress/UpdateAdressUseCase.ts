import { inject, injectable } from "tsyringe";

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
            throw new Error("User does not exists.");
        }

        const adress = await this.adressRepository.findById(id);

        if (!adress) {
            throw new Error("User does not exists.");
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

        try {
            const adressUpdated = await this.adressRepository.update(adress);
            return adressUpdated;
        } catch (error) {
            const { message } = error as Error;
            return message;
        }
    }
}

export { UpdateAdressUseCase };
