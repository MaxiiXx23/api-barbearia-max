import { Router } from "express";

import { CreateAdressController } from "../../../../modules/adress/useCases/createAdress/CreateAdressController";
import { DeleteAdressController } from "../../../../modules/adress/useCases/deleteAdress/DeleteAdressController";
import { GetAddressesController } from "../../../../modules/adress/useCases/getAdresses/GetAddressesController";
import { UpdateAdressController } from "../../../../modules/adress/useCases/updateAdress/UpdateAdressController";
import { validatorAddress } from "../middlewares/validators/validatorAddress";

const addressRoutes = Router();

const createAdressController = new CreateAdressController();
const updateAdressController = new UpdateAdressController();
const getAddressesController = new GetAddressesController();
const deleteAdressController = new DeleteAdressController();

addressRoutes.post("/", validatorAddress, createAdressController.handle);
addressRoutes.put(
    "/update/:id",
    validatorAddress,
    updateAdressController.handle
);
addressRoutes.get("/getAddresses/:id", getAddressesController.handle);
addressRoutes.delete("/delete/:id", deleteAdressController.handle);

export { addressRoutes };
