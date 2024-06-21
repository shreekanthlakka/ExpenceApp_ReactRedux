import express from "express";
import { checkSchema, body, param } from "express-validator";
import Category from "../models/category.model.js";
const router = express.Router();

import {
    getAllCategories,
    addCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";
import { categoryValidationSchema } from "../validators/category.validationSchema.js";
import { isLoggedIn } from "../middleware/IsLoggedIn.js";

router
    .route("/")
    .get(isLoggedIn, getAllCategories)
    .post(checkSchema(categoryValidationSchema), isLoggedIn, addCategory);
router
    .route("/:id")
    .get(
        param("id").exists().notEmpty().isMongoId(),
        isLoggedIn,
        getSingleCategory
    )
    .put(
        param("id").exists().notEmpty().isMongoId(),
        body("categoryname")
            .exists()
            .notEmpty()
            .custom(async (val) => {
                const cat = await Category.findOne({ categoryname: val });
                if (!cat) return true;
            })
            .withMessage("This category already exists."),
        body(""),
        isLoggedIn,
        updateCategory
    )
    .delete(
        param("id").exists().notEmpty().isMongoId(),
        isLoggedIn,
        deleteCategory
    );

export default router;
