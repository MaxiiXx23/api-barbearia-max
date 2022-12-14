import { Router } from "express";

import { CreateServiceController } from "../../../../modules/service/useCases/CreateService/CreateServiceController";
import { DeleteServiceController } from "../../../../modules/service/useCases/DeleteService/DeleteServiceController";
import { GetServiceController } from "../../../../modules/service/useCases/GetServices/GetServiceController";
import { UpdateServiceController } from "../../../../modules/service/useCases/UpdateService/UpdateServiceController";
import { validatorService } from "../middlewares/validators/validatorService";

const serviceRoutes = Router();

const getServiceController = new GetServiceController();
const createServiceController = new CreateServiceController();
const updateServiceController = new UpdateServiceController();
const deleteServiceController = new DeleteServiceController();

serviceRoutes.get("/", getServiceController.handle);

serviceRoutes.post("/", validatorService, createServiceController.handle);

serviceRoutes.put(
    "/update/:id",
    validatorService,
    updateServiceController.handle
);

serviceRoutes.delete("/delete/:id", deleteServiceController.handle);

export { serviceRoutes };
