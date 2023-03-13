import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { UploadPhotoUseCase } from "./UploadPhotoUseCase";

class UploadPhotoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: id_user } = request.user;
        const { id } = request.params;
        const photo_file = request.file.filename;

        const uploadPhotoUseCase = container.resolve(UploadPhotoUseCase);

        try {
            const profileUpadted = await uploadPhotoUseCase.execute({
                id_user,
                id,
                photo_file,
            });

            return response.json({
                msg: "Upload photo with success.",
                profile: profileUpadted,
            });
        } catch (error) {
            const { message, statusCode } = error as ApiError;
            return response.status(statusCode).json({ error: message });
        }
    }
}

export { UploadPhotoController };
