import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { validatorUser } from "../middlewares/validatorUser";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", validatorUser, createUserController.handle);

export { usersRoutes };
