import { Router } from "express";
import multer from "multer";

import { upload } from "../../../../config/upload";
import { CreateSalonController } from "../../../../modules/salon/useCases/CreateSalon/CreateSalonController";
import { ProfileSalonController } from "../../../../modules/salon/useCases/ProfileSalon/ProfileSalonController";
import { UpdateSalonController } from "../../../../modules/salon/useCases/UpdateSalon/UpdateSalonController";
import { UploadPhotoController } from "../../../../modules/salon/useCases/UploadPhoto/UploadPhotoController";
import { validatorSalon } from "../middlewares/validators/validatorSalon";
import { verifyToken } from "../middlewares/verifyToken";

const salonRoutes = Router();
const uploadProfile = multer(upload);

const createSalonController = new CreateSalonController();
const profileSalonController = new ProfileSalonController();
const updatedSalonController = new UpdateSalonController();
const uploadPhotoController = new UploadPhotoController();

salonRoutes.post(
    "/",
    verifyToken,
    validatorSalon,
    createSalonController.handle
);
salonRoutes.put(
    "/update/:id",
    verifyToken,
    validatorSalon,
    updatedSalonController.handle
);

salonRoutes.patch(
    "/upload/profile/:id",
    verifyToken,
    uploadProfile.single("profile"),
    uploadPhotoController.handle
);

salonRoutes.get("/:id", profileSalonController.handle);

export { salonRoutes };
