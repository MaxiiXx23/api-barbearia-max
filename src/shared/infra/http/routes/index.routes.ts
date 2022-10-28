import { Router } from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { adressRoutes } from "./adress.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.get("/", (request, response) => {
    return response.status(201).json({
        message: "hello",
    });
});

routes.use("/users", usersRoutes);
routes.use("/adress", verifyToken, adressRoutes);

export { routes };
