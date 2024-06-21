import { validationResult } from "express-validator";
import Expence from "../models/expence.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const getAllExpences = asyncHandler(async (req, res) => {
    const expences = await Expence.find({ owner: req.user._id }).populate(
        "categoryId",
        ["categoryname"]
    );
    if (!expences) {
        throw new ApiError(404, "no expences found");
    }
    res.status(200).json(
        new ApiResponce(200, "sucessfully fetched all expences", expences)
    );
});

const createExpence = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad  request", errors.array()));
    }
    const { date, amount, description, categoryId } = req.body;
    const newExpence = await Expence.create({
        categoryId,
        amount,
        description,
        date,
        owner: req.user?._id,
    });
    if (!newExpence) {
        throw new ApiError(401, "error while creating the expence");
    }
    const exp = await Expence.findById(newExpence._id).populate("categoryId", [
        "categoryname",
    ]);
    res.status(200).json(
        new ApiResponce(200, "created expence sucessfuly", exp)
    );
});

const getExpence = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "Bad Request", errors.array()));
    }
    const expence = await Expence.findById(req.params.id);
    if (!expence) {
        throw new ApiError(401, "not able to find the expence");
    }
    res.status(200).json(
        new ApiResponce(200, "got expence sucessfully", expence)
    );
});

const updateExpence = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }
    const updatedExpence = await Expence.findByIdAndUpdate(
        req.params.id,
        {
            ...req.body,
            owner: req.user._id,
        },
        { new: true }
    );
    if (!updatedExpence) {
        throw new ApiError(404, "expence not updated");
    }
    const responce = await Expence.findById(req.params.id).populate(
        "categoryId",
        ["categoryname"]
    );
    res.status(200).json(new ApiResponce(200, "updated sucessfully", responce));
});

const deleteExpence = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }
    const delExp = await Expence.findByIdAndDelete(req.params.id);
    if (!delExp) {
        throw new ApiError(400, "not deleted");
    }
    res.status(200).json(
        new ApiResponce(200, "deleated expence sucessfully", delExp)
    );
});

export {
    getAllExpences,
    createExpence,
    getExpence,
    updateExpence,
    deleteExpence,
};
