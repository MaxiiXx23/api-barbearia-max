import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password, name } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);

        try {
            await createUserUseCase.execute({
                email,
                password,
                name,
            });
            return response.status(201).json({ message: "User created." });
        } catch (error) {
            const { message } = error as Error;
            return response.status(400).json({ error: message });
        }
    }
}

export { CreateUserController };
