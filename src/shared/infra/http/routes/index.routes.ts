import { Router } from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { addressRoutes } from "./adress.routes";
import { salonRoutes } from "./salon.routes";
import { serviceRoutes } from "./service.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/address", verifyToken, addressRoutes);
routes.use("/salon", salonRoutes);
routes.use("/service", verifyToken, serviceRoutes);

export { routes };
