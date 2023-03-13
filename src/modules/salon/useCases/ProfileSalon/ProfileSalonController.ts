import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { ProfileSalonUseCase } from "./ProfileSalonUseCase";

class ProfileSalonController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const profileSalonUseCase = container.resolve(ProfileSalonUseCase);

        try {
            const salon = await profileSalonUseCase.execute(id);
            return response.json(salon);
        } catch (error) {
            const { message, statusCode } = error as ApiError;
            return response.status(statusCode).json({ error: message });
        }
    }
}

export { ProfileSalonController };
