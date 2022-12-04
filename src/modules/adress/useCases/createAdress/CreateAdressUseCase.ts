import { injectable, inject } from "tsyringe";

import { ICreateAdressDTO } from "../../dtos/ICreateAdressDTO";
import { IAdressRepository } from "../../repositories/IAdressRepository";

@injectable()
class CreateAdressUseCase {
    constructor(
        @inject("AdressRepository")
        private adressRepository: IAdressRepository
    ) {}

    async execute({
        cep,
        public_place,
        number,
        complement,
        city,
        state,
        country,
        reference,
        user_id,
    }: ICreateAdressDTO): Promise<void> {
        try {
            await this.adressRepository.create({
                cep,
                public_place,
                number,
                complement,
                city,
                state,
                country,
                reference,
                user_id,
            });
        } catch (error) {
            const { message } = error as Error;
            console.log(message);
        }
    }
}

export { CreateAdressUseCase };
