import { injectable, inject } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IAdressRepository } from "../../repositories/IAdressRepository";

@injectable()
class DeleteAdressUseCase {
    constructor(
        @inject("AdressRepository")
        private adressRepository: IAdressRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(id: string, id_user: string): Promise<void> {
        const user = await this.usersRepository.findById(id_user);

        if (!user) {
            throw new ApiError("User does not exists.", 400);
        }

        const adress = await this.adressRepository.findById(id);
        if (!adress) {
            throw new ApiError("Adress does not exists.", 400);
        }

        await this.adressRepository.delete(adress.id);
    }
}

export { DeleteAdressUseCase };
