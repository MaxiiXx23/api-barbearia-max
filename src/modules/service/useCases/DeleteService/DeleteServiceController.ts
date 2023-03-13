import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { DeleteServiceUseCase } from "./DeleteServiceUseCase";

class DeleteServiceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: id_user } = request.user;
        const { id } = request.params;

        const deleteServiceUseCase = container.resolve(DeleteServiceUseCase);

        try {
            await deleteServiceUseCase.execute({ id_user, id });
            return response.json({ message: "Service deleted." });
        } catch (error) {
            const { message, statusCode } = error as ApiError;
            return response.status(statusCode).json({ error: message });
        }
    }
}

export { DeleteServiceController };
