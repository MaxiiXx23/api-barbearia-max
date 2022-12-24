import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticaUserController";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { validatorAuthenticate } from "../middlewares/validators/validatorAuthenticate";
import { validatorUser } from "../middlewares/validators/validatorUser";
import { verifyToken } from "../middlewares/verifyToken";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post("/", validatorUser, createUserController.handle);
usersRoutes.get("/profile", verifyToken, profileUserController.handle);
usersRoutes.post(
    "/authenticate",
    validatorAuthenticate,
    authenticateUserController.handle
);

export { usersRoutes };
