import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectWithDB } from "./db/db.js";

connectWithDB();

app.listen(process.env.PORT, () =>
    console.log(`server is up and running on Port ${process.env.PORT}`)
);
