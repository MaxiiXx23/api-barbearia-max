import { injectable, inject } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
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
            throw new ApiError("User haven't permition.", 401);
        }

        const salon = await this.salonRepository.findToUpdateById(id);

        if (!salon) {
            throw new ApiError("Salon does not exists.", 400);
        }

        salon.name = name;
        salon.slogan = slogan;
        salon.adress_id = adress_id;

        const salonUpdated = await this.salonRepository.update(salon);

        return salonUpdated;
    }
}

export { UpdateSalonUseCase };
