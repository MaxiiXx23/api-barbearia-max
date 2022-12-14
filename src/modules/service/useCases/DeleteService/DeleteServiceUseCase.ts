import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { IServicesRepository } from "../../repositories/IServicesRepository";

interface IRequest {
    id_user: string;
    id: string;
}

@injectable()
class DeleteServiceUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({ id_user, id }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(id_user);
        if (!user.isAdmin) {
            throw new Error("user haven't permition.");
        }

        const service = await this.servicesRepository.findById(id);

        if (!service) {
            throw new Error("Service not found.");
        }

        await this.servicesRepository.delete(id);
    }
}

export { DeleteServiceUseCase };
