import { injectable, inject } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
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
            throw new ApiError("user haven't permition.", 401);
        }

        const service = await this.servicesRepository.findById(id);

        if (!service) {
            throw new ApiError("Service not found.", 400);
        }

        await this.servicesRepository.delete(id);
    }
}

export { DeleteServiceUseCase };
