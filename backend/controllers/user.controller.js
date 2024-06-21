import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { createToken } from "../utils/createToken.js";

const register = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }
    const { email, password, name, phonenumber } = req.body;
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        phonenumber,
    });
    if (!user) {
        throw new ApiError(400, "Failed to create an account");
    }
    res.status(200).json(
        new ApiResponce(201, "user created sucessfully", user)
    );
});

const login = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "bad  request"));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, "Email or Password is wrong.");
    }
    const isValidPassword = await user.isValidatePassword(password);
    if (!isValidPassword) {
        throw new ApiError(401, "Email or Password is wrong.");
    }
    if (isValidPassword) {
        createToken(user._id, res);
    }
});

const logout = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(400, "invalid token");
    }
    user.accessToken = null;
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
    setTimeout(() => {
        res.status(200)
            .clearCookie("accessToken", { httpOnly: true })
            .clearCookie("refreshToken", { httpOnly: true })
            .json(new ApiResponce(200, "loggedout sucessfully", {}));
    }, 0);
});

const loggedInUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found or invalid token");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        data: user,
        isAuthenticated: true,
    });
});

const generateRefreshToken = asyncHandler(async (req, res) => {});

const forgotPassword = asyncHandler(async (req, res) => {});

const resetPassword = asyncHandler(async (req, res) => {});

export {
    register,
    login,
    logout,
    generateRefreshToken,
    loggedInUserDetails,
    forgotPassword,
    resetPassword,
};
