import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetServiceUseCase } from "./GetServiceUseCase";

class GetServiceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: id_user } = request.user;
        const { name } = request.body;

        const getServiceUseCase = container.resolve(GetServiceUseCase);

        try {
            const service = await getServiceUseCase.execute({ id_user, name });
            return response.json({ service });
        } catch (error) {
            const { message } = error as Error;

            return response.status(500).json({ error: message });
        }
    }
}

export { GetServiceController };
