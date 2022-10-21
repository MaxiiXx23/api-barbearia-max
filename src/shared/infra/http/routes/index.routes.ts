import { Router } from "express";

import { usersRoutes } from "./users.routes";

const routes = Router();

routes.get("/", (request, response) => {
    return response.status(201).json({
        message: "hello",
    });
});

routes.use("/users", usersRoutes);

export { routes };
