import { injectable, inject } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { SalonMapper } from "../../mapper/SalonMapper";
import { ISalonRepository } from "../../repositories/ISalonRepository";

@injectable()
class ProfileSalonUseCase {
    constructor(
        @inject("SalonRepository")
        private salonRepository: ISalonRepository
    ) {}

    async execute(id: string) {
        const salon = await this.salonRepository.findById(id);
        if (!salon) {
            throw new ApiError("Salon not found.", 400);
        }
        return SalonMapper.toDTO(salon[0]);
    }
}

export { ProfileSalonUseCase };
