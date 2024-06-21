import Category from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ owner: req.user._id }).populate({
        path: "owner",
        model: "User",
        select: ["name", "email"],
    });
    if (!categories) {
        throw new ApiError(404, "No category found!");
    }
    res.status(200).json(
        new ApiResponce(
            200,
            "Successfully retrieved all categories!",
            categories
        )
    );
});

const addCategory = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }

    const category = await Category.create({
        categoryname: req.body.categoryname,
        owner: req.user._id,
    });
    if (!category) {
        throw new ApiError(400, "something went wrong");
    }
    res.status(201).json(
        new ApiResponce(201, "category created sucessfully", category)
    );
});

const getSingleCategory = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }
    const category = await Category.findById(req.params.id).populate({
        path: "owner",
        model: "User",
        select: ["name", "email"],
    });
    if (!category) {
        throw new ApiError(400, "no category found");
    }
    res.status(200).json(new ApiResponce(200, "success", category));
});

const updateCategory = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }
    const updatedCat = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedCat) {
        throw new ApiError(401, "not able to update");
    }
    res.status(200).json(
        new ApiResponce(200, "updated sucessfully", updatedCat)
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) {
        throw new ApiError(404, "No such category found to delete");
    }
    setTimeout(() => {
        res.status(200).json(
            new ApiResponce(200, "deletated sucessfully", cat)
        );
    }, 0);
});

export {
    getAllCategories,
    addCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
