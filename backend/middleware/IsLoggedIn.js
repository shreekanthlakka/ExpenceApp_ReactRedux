import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const isLoggedIn = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.headers["Authorization"]?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Not logged in");
    }
    const decodedId = await jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decodedId._id);
    if (!user) {
        throw new ApiError(401, "Invalid token");
    }
    req.user = user;
    next();
});

export { isLoggedIn };
