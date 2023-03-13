import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { GetAddressesUseCase } from "./GetAddressesUseCase";

class GetAddressesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: id_user } = request.user;
        const { id } = request.params;

        const getAddressesUseCase = container.resolve(GetAddressesUseCase);

        try {
            const address = await getAddressesUseCase.execute({ id_user, id });
            return response.json({ address });
        } catch (error) {
            const { message, statusCode } = error as ApiError;

            return response.status(statusCode).json({ message });
        }
    }
}

export { GetAddressesController };
