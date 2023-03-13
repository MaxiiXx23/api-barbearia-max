import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const profileUserUseCase = container.resolve(ProfileUserUseCase);

        try {
            const user = await profileUserUseCase.execute(id);

            return response.json(user);
        } catch (error) {
            const { message, statusCode } = error as ApiError;
            return response.status(statusCode).json({ error: message });
        }
    }
}

export { ProfileUserController };
