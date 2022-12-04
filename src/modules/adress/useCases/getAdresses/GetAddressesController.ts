import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAddressesUseCase } from "./GetAddressesUseCase";

class GetAddressesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const getAddressesUseCase = container.resolve(GetAddressesUseCase);

        try {
            const address = await getAddressesUseCase.execute(id);
            return response.json({ address });
        } catch (error) {
            const { message } = error as Error;

            return response.status(500).json({ message });
        }
    }
}

export { GetAddressesController };
