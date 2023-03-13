import { injectable, inject } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICreateAdressDTO } from "../../dtos/ICreateAdressDTO";
import { IAdressRepository } from "../../repositories/IAdressRepository";

@injectable()
class CreateAdressUseCase {
    constructor(
        @inject("AdressRepository")
        private adressRepository: IAdressRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
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
    }: ICreateAdressDTO): Promise<string | void> {
        const user = await this.usersRepository.findById(user_id);
        if (user) {
            throw new ApiError("User already exists.", 400);
        }

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
            return "Address created";
        } catch (error) {
            const { message } = error as Error;
            return message;
        }
    }
}

export { CreateAdressUseCase };
