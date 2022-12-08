import { injectable, inject } from "tsyringe";

import { ISalonRepository } from "../../repositories/ISalonRepository";

@injectable()
class ProfileSalonUseCase {
    constructor(
        @inject("SalonRepository")
        private salonRepository: ISalonRepository
    ) {}

    async execute(id: string) {
        const salon = await this.salonRepository.findById(id);
        return salon;
    }
}

export { ProfileSalonUseCase };
