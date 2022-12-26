import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadPhotoUserUseCase } from "./UploadPhotoUseCase";

class UploadPhotoUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const file = request.file.filename;

        const uploadPhotoUserUseCase = container.resolve(
            UploadPhotoUserUseCase
        );

        try {
            const newPhoto = await uploadPhotoUserUseCase.execute({ id, file });
            return response.json({ photoUpdated: newPhoto });
        } catch (error) {
            const { message } = error as Error;
            return response.status(500).json({ error: message });
        }
    }
}

export { UploadPhotoUserController };
