import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { Service } from "../../infra/typeorm/entities/Service";
import { IServicesRepository } from "../../repositories/IServicesRepository";

interface IRequest {
    id_user: string;
    name: string;
}

@injectable()
class GetServiceUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({ id_user, name }: IRequest): Promise<Service> {
        const user = await this.usersRepository.findById(id_user);

        if (!user) {
            throw new Error("User does not exists.");
        }

        const service = await this.servicesRepository.findByName(name);

        return service;
    }
}

export { GetServiceUseCase };
