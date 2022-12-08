import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICreateSalonDTO } from "../../dtos/ICreateSalonDTO";
import { ISalonRepository } from "../../repositories/ISalonRepository";

@injectable()
class UpdateSalonUseCase {
    constructor(
        @inject("SalonRepository")
        private salonRepository: ISalonRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ id, id_user, name, slogan, adress_id }: ICreateSalonDTO) {
        const user = await this.usersRepository.findById(id_user);

        if (!user.isAdmin) {
            throw new Error("User haven't permition.");
        }

        const salon = await this.salonRepository.findToUpdateById(id);

        if (!salon) {
            throw new Error("Salon does not exists.");
        }

        salon.name = name;
        salon.slogan = slogan;
        salon.adress_id = adress_id;

        const salonUpdated = await this.salonRepository.update(salon);

        return salonUpdated;
    }
}

export { UpdateSalonUseCase };
