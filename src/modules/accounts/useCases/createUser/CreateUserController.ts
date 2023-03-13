import { Request, Response } from "express";
import { container } from "tsyringe";

import { ApiError } from "../../../../shared/error/ApiError";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        // deve ser possível cadastrar tbm idade, telefone
        const { email, password, name, phone } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);

        try {
            await createUserUseCase.execute({
                email,
                password,
                name,
                phone,
            });
            return response.status(201).json({ message: "User created." });
        } catch (error) {
            const { message, statusCode } = error as ApiError;
            return response.status(statusCode).json({ error: message });
        }
    }
}

export { CreateUserController };
