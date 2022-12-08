import "reflect-metadata";
import express from "express";

import "dotenv/config";

import "../../container";
import { upload } from "../../../config/upload";
import { routes } from "./routes/index.routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use("/profile", express.static(`${upload.tmpFolder}/profile`));

export { app };
