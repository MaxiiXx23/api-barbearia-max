import { Request, Response } from "express";
import { container } from "tsyringe";

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
            const { message } = error as Error;
            return response.status(500).json({ error: message });
        }
    }
}

export { DeleteServiceController };
