import express from "express";
import {
    createExpence,
    deleteExpence,
    getAllExpences,
    getExpence,
    updateExpence,
} from "../controllers/expence.controller.js";
import { checkSchema } from "express-validator";
import { expenceValidationSchema } from "../validators/expence.validationSchema.js";
import { isLoggedIn } from "../middleware/IsLoggedIn.js";
const router = express.Router();

router
    .route("/")
    .get(isLoggedIn, getAllExpences)
    .post(checkSchema(expenceValidationSchema), isLoggedIn, createExpence);

router
    .route("/:id")
    .get(isLoggedIn, getExpence)
    .put(isLoggedIn, updateExpence)
    .delete(isLoggedIn, deleteExpence);

export default router;
