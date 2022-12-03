import { Router } from "express";

import { CreateAdressController } from "../../../../modules/adress/useCases/createAdress/CreateAdressController";
import { DeleteAdressController } from "../../../../modules/adress/useCases/deleteAdress/DeleteAdressController";
import { UpdateAdressController } from "../../../../modules/adress/useCases/updateAdress/UpdateAdressController";
import { validatorAdress } from "../middlewares/validators/validatorAdress";

const adressRoutes = Router();

const createAdressController = new CreateAdressController();
const updateAdressController = new UpdateAdressController();
const deleteAdressController = new DeleteAdressController();

adressRoutes.post("/", validatorAdress, createAdressController.handle);
adressRoutes.put("/update/:id", validatorAdress, updateAdressController.handle);
adressRoutes.delete("/delete/:id", deleteAdressController.handle);

export { adressRoutes };
