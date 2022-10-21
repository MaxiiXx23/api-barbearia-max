import "reflect-metadata";
import express from "express";

import "dotenv/config";

import "../../container";

import { routes } from "./routes/index.routes";

const app = express();

app.use(express.json());

app.use(routes);

export { app };
