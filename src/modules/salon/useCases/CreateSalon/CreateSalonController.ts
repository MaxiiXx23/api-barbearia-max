import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSalonUseCase } from "./CreateSalonUseCase";

class CreateSalonController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: id_user } = request.user;

        const { name, slogan, adress_id } = request.body;

        const createSalonUseCase = container.resolve(CreateSalonUseCase);

        try {
            const salon = await createSalonUseCase.execute({
                id_user,
                name,
                slogan,
                adress_id,
            });

            return response.json({ salon });
        } catch (error) {
            const { message } = error as Error;
            return response.status(500).json({ message });
        }
    }
}

export { CreateSalonController };
