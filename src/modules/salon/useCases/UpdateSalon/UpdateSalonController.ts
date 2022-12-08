import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateSalonUseCase } from "./UpdateSalonUseCase";

class UpdateSalonController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: id_user } = request.user;
        const { id } = request.params;
        const { name, slogan, adress_id } = request.body;

        const updateSalonUseCase = container.resolve(UpdateSalonUseCase);

        try {
            const salon = await updateSalonUseCase.execute({
                id,
                id_user,
                name,
                slogan,
                adress_id,
            });

            return response.json(salon);
        } catch (error) {
            const { message } = error as Error;
            return response.status(500).json({ error: message });
        }
    }
}

export { UpdateSalonController };
