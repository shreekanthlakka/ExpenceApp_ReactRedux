import express from "express";
import { body } from "express-validator";
import {
    loggedInUserDetails,
    login,
    logout,
    register,
} from "../controllers/user.controller.js";
import { userValidationSchema } from "../validators/user.validationSchema.js";
import { checkSchema } from "express-validator";
import { isLoggedIn } from "../middleware/IsLoggedIn.js";
const router = express.Router();

router
    .route("/login")
    .post(
        body("email").exists().notEmpty().isEmail(),
        body("password").exists().notEmpty().trim(),
        login
    );
router.route("/register").post(checkSchema(userValidationSchema), register);
router.route("/logout").post(isLoggedIn, logout);
router.route("/loggedInUser").post(isLoggedIn, loggedInUserDetails);

export default router;
