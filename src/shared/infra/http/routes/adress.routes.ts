import { Router } from "express";

import { CreateAdressController } from "../../../../modules/adress/useCases/createAdress/CreateAdressController";
import { DeleteAdressController } from "../../../../modules/adress/useCases/deleteAdress/DeleteAdressController";
import { validatorAdress } from "../middlewares/validators/validatorAdress";

const adressRoutes = Router();

const createAdressController = new CreateAdressController();
const deleteAdressController = new DeleteAdressController();

adressRoutes.post("/", validatorAdress, createAdressController.handle);
adressRoutes.delete("/delete/:id", deleteAdressController.handle);

export { adressRoutes };
