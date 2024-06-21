import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: {
            type: String,
            select: false,
        },
        phonenumber: {
            type: String,
            select: false,
        },
        role: {
            type: String,
            default: "guest",
        },
        otp: {
            type: String,
            select: false,
        },
        accessToken: {
            type: String,
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },
        forgetPasswordToken: { type: String },
        forgotPasswordExpiry: { type: Date },
        isVerified: { type: Boolean, default: false },
        authenticatedAt: { type: [Date], select: false },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("phonenumber")) return next();
    this.phonenumber = await bcrypt.hash(this.phonenumber, 10);
    next();
});

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET, { expiresIn: "1h" });
};

userSchema.methods.isValidatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getForgotPasswordToken = async function () {
    const token = await crypto.randomBytes(20).toString("hex");
    this.forgetPasswordToken = await crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
    return token;
};

const User = mongoose.model("User", userSchema);
export default User;
