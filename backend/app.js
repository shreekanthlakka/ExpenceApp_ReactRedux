import express, { urlencoded } from "express";
import cookieparser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(morgan("tiny"));
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE ,PATCH"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

import category from "./routes/category.routes.js";
import expence from "./routes/expence.routes.js";
import user from "./routes/user.routes.js";

app.use("/api/v1/categories", category);
app.use("/api/v1/expences", expence);
app.use("/api/v1/users", user);

export default app;
