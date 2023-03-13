import { inject, injectable } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IRequestServiceDTO } from "../../dtos/IRequestServiceDTO";
import { Service } from "../../infra/typeorm/entities/Service";
import { IServicesRepository } from "../../repositories/IServicesRepository";

@injectable()
class UpdateServiceUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({
        id_user,
        id,
        name,
        description,
    }: IRequestServiceDTO): Promise<Service> {
        const user = await this.usersRepository.findById(id_user);
        if (!user.isAdmin) {
            throw new ApiError("User haven't permition.", 401);
        }

        const service = await this.servicesRepository.findById(id);

        if (!service) {
            throw new ApiError("Service not found.", 400);
        }

        service.name = name;
        service.description = description;

        const serviceUpdated = await this.servicesRepository.update(service);
        return serviceUpdated;
    }
}

export { UpdateServiceUseCase };
