import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateServiceUseCase } from "./UpdateServiceUseCase";

class UpdateServiceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: id_user } = request.user;
        const { id } = request.params;
        const { name, description } = request.body;

        const updateServiceUseCase = container.resolve(UpdateServiceUseCase);

        try {
            const serviceUpdated = await updateServiceUseCase.execute({
                id_user,
                id,
                name,
                description,
            });

            return response.json({ serviceUpdated });
        } catch (error) {
            const { message } = error as Error;
            return response.status(500).json({ error: message });
        }
    }
}

export { UpdateServiceController };
