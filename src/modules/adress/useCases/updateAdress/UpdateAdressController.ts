import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAdressUseCase } from "./UpdateAdressUseCase";

class UpdateAdressController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;
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

        const updateAdressUseCase = container.resolve(UpdateAdressUseCase);

        try {
            const adressUpdated = await updateAdressUseCase.execute({
                user_id,
                id,
                cep,
                public_place,
                number,
                complement,
                city,
                state,
                country,
                reference,
            });
            return response.json({ adressUpdated });
        } catch (error) {
            const { message } = error as Error;

            return response.status(500).json({ error: message });
        }
    }
}

export { UpdateAdressController };
