import { injectable, inject } from "tsyringe";

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

        if (!user.isAdmin) {
            throw new Error("User haven't permission.");
        }

        const adress = await this.adressRepository.findById(id);
        if (!adress) {
            throw new Error("Adress does not exists.");
        }

        await this.adressRepository.delete(adress.id);
    }
}

export { DeleteAdressUseCase };
