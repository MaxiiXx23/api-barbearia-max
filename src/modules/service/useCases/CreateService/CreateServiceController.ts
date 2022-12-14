import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateServiceUseCase } from "./CreateServiceUseCase";

class CreateServiceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: id_user } = request.user;
        const { name, description } = request.body;

        const createServiceUseCase = container.resolve(CreateServiceUseCase);

        try {
            const service = await createServiceUseCase.execute({
                id_user,
                name,
                description,
            });

            return response.json({ service });
        } catch (error) {
            const { message } = error as Error;

            return response.status(500).json({ error: message });
        }
    }
}

export { CreateServiceController };
