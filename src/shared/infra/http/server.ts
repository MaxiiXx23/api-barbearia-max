import { createConnection } from "../typeorm";
import { app } from "./app";

createConnection();

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
