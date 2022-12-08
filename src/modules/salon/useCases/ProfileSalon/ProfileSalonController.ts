import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileSalonUseCase } from "./ProfileSalonUseCase";

class ProfileSalonController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const profileSalonUseCase = container.resolve(ProfileSalonUseCase);

        try {
            const salon = await profileSalonUseCase.execute(id);
            return response.json(salon);
        } catch (error) {
            const { message } = error as Error;
            return response.status(500).json({ error: message });
        }
    }
}

export { ProfileSalonController };
