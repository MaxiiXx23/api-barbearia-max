import { inject, injectable } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IRequestServiceDTO } from "../../dtos/IRequestServiceDTO";
import { Service } from "../../infra/typeorm/entities/Service";
import { IServicesRepository } from "../../repositories/IServicesRepository";

@injectable()
class CreateServiceUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({
        id_user,
        name,
        description,
    }: IRequestServiceDTO): Promise<Service> {
        const user = await this.usersRepository.findById(id_user);

        if (!user.isAdmin) {
            throw new ApiError("User haven't permition.", 401);
        }

        const serviceAlreadyExists = await this.servicesRepository.findByName(
            name
        );

        if (serviceAlreadyExists) {
            throw new ApiError("Service Already Exists.", 400);
        }

        const newService = await this.servicesRepository.create({
            name,
            description,
        });
        return newService;
    }
}

export { CreateServiceUseCase };
