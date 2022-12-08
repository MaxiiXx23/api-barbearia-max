import { Router } from "express";

import { CreateSalonController } from "../../../../modules/salon/useCases/CreateSalon/CreateSalonController";
import { ProfileSalonController } from "../../../../modules/salon/useCases/ProfileSalon/ProfileSalonController";
import { UpdateSalonController } from "../../../../modules/salon/useCases/UpdateSalon/UpdateSalonController";
import { verifyToken } from "../middlewares/verifyToken";

const salonRoutes = Router();

const createSalonController = new CreateSalonController();
const profileSalonController = new ProfileSalonController();
const updatedSalonController = new UpdateSalonController();

salonRoutes.post("/", verifyToken, createSalonController.handle);
salonRoutes.put("/update/:id", verifyToken, updatedSalonController.handle);
salonRoutes.get("/:id", profileSalonController.handle);

export { salonRoutes };
