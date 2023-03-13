import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { CreateAdressUseCase } from "./CreateAdressUseCase";

class CreateAdressController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const {
            cep,
            public_place,
            number,
            complement,
            city,
            state,
            country,
            reference,
        } = request.body;

        const createAdressUseCase = container.resolve(CreateAdressUseCase);

        try {
            await createAdressUseCase.execute({
                cep,
                public_place,
                number,
                complement,
                city,
                state,
                country,
                reference,
                user_id,
            });

            return response.status(201).json({ msg: "Adress created." });
        } catch (error) {
            const { message, statusCode } = error as ApiError;
            return response.status(statusCode).json({ error: message });
        }
    }
}

export { CreateAdressController };
