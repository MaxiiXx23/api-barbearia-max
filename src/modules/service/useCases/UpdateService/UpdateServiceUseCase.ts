import { inject, injectable } from "tsyringe";

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
            throw new Error("User haven't permition.");
        }

        const service = await this.servicesRepository.findById(id);

        if (!service) {
            throw new Error("Service not found.");
        }

        service.name = name;
        service.description = description;

        const serviceUpdated = await this.servicesRepository.update(service);
        return serviceUpdated;
    }
}

export { UpdateServiceUseCase };
