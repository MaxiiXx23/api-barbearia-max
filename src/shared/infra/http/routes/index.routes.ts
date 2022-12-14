import { Router } from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { adressRoutes } from "./adress.routes";
import { salonRoutes } from "./salon.routes";
import { serviceRoutes } from "./service.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.get("/", (request, response) => {
    return response.status(201).json({
        message: "hello",
    });
});

routes.use("/users", usersRoutes);
routes.use("/adress", verifyToken, adressRoutes);
routes.use("/salon", salonRoutes);
routes.use("/service", verifyToken, serviceRoutes);

export { routes };
