import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { name, phone } = request.body;
        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        try {
            const userUpdated = await updateUserUseCase.execute({
                id,
                name,
                phone,
            });

            return response.json({ userUpdated });
        } catch (error) {
            const { message } = error as Error;
            return response.status(500).json({ error: message });
        }
    }
}

export { UpdateUserController };
