import { Router } from "express";

import { CreateServiceController } from "../../../../modules/service/useCases/CreateService/CreateServiceController";
import { validatorService } from "../middlewares/validators/validatorService";
import { verifyToken } from "../middlewares/verifyToken";

const serviceRoutes = Router();

const createServiceController = new CreateServiceController();

serviceRoutes.post(
    "/",
    verifyToken,
    validatorService,
    createServiceController.handle
);

export { serviceRoutes };
