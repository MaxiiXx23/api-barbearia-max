import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAdressUseCase } from "./DeleteAdressUseCase";

class DeleteAdressController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;

        const deleteAdressUseCase = container.resolve(DeleteAdressUseCase);

        try {
            await deleteAdressUseCase.execute(id, user_id);
            return response.json({ msg: "Adress deleted." });
        } catch (error) {
            const { message } = error as Error;
            return response.status(500).json({ error: message });
        }
    }
}

export { DeleteAdressController };
