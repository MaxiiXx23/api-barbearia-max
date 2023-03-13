import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { GetServiceUseCase } from "./GetServiceUseCase";

class GetServiceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: id_user } = request.user;
        const { name } = request.body;

        const getServiceUseCase = container.resolve(GetServiceUseCase);

        try {
            const service = await getServiceUseCase.execute({ id_user, name });
            return response.json({ service });
        } catch (error) {
            const { message, statusCode } = error as ApiError;

            return response.status(statusCode).json({ error: message });
        }
    }
}

export { GetServiceController };
