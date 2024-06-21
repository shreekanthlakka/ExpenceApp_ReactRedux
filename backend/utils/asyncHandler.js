// const asyncHandler = (fun) => {
//     return (req, res, next) => {
//         Promise.resolve(fun(req, res, next)).catch((err) => next(err));
//     };
// };

import { ApiError } from "./ApiError.js";

const asyncHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(new ApiError(error.status, error.message, error));
        }
    };
};

export { asyncHandler };
