import { Router } from "express";
import multer from "multer";

import { upload } from "../../../../config/upload";
import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticaUserController";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUserController } from "../../../../modules/accounts/useCases/updateUser/UpdateUserController";
import { UploadPhotoUserController } from "../../../../modules/accounts/useCases/uploadPhotoUser/UploadPhotoUserController";
import { validatorAuthenticate } from "../middlewares/validators/validatorAuthenticate";
import { validatorUpdateUser } from "../middlewares/validators/validatorUpdateUser";
import { validatorUser } from "../middlewares/validators/validatorUser";
import { verifyToken } from "../middlewares/verifyToken";

const usersRoutes = Router();
const uploadProfile = multer(upload);

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserController = new UpdateUserController();
const uploadPhotoUserController = new UploadPhotoUserController();

usersRoutes.post("/", validatorUser, createUserController.handle);
usersRoutes.put(
    "/update",
    verifyToken,
    validatorUpdateUser,
    updateUserController.handle
);

usersRoutes.patch(
    "/upload/photo",
    verifyToken,
    uploadProfile.single("photo"),
    uploadPhotoUserController.handle
);

usersRoutes.get("/profile", verifyToken, profileUserController.handle);

usersRoutes.post(
    "/authenticate",
    validatorAuthenticate,
    authenticateUserController.handle
);

export { usersRoutes };
