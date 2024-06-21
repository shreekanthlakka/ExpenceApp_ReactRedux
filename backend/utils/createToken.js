import User from "../models/user.model.js";

const createToken = async (id, res) => {
    const user = await User.findById(id).select(
        "+accessToken +refreshToken +authenticatedAt"
    );
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.accessToken = accessToken;
    user.authenticatedAt = [...user.authenticatedAt, new Date().toISOString()];
    await user.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        maxAge: new Date(Date.now() + 1 * 60 * 60 * 1000),
    };
    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            message: "Logged in successfully",
            statusCode: 200,
            session: {
                accessToken,
                refreshToken,
                expiresAt: new Date(options.maxAge),
                expiresIn: options.maxAge,
            },
            data: user,
        });
};

export { createToken };
