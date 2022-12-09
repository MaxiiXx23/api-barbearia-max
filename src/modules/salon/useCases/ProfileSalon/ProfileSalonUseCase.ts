import { injectable, inject } from "tsyringe";

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
            throw new Error("Salon not found.");
        }
        return SalonMapper.toDTO(salon[0]);
    }
}

export { ProfileSalonUseCase };
