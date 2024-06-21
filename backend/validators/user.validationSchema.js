import User from "../models/user.model.js";
import validator from "validator";
const { isMobilePhone, isEmail } = validator;
// import isEmail from "validator/es/lib/isEmail";

const userValidationSchema = {
    name: {
        in: ["body"],
        exists: {
            errorMessage: "Name is required",
        },
        notEmpty: {
            errorMessage: "name cannot be empty",
        },
        trim: true,
    },
    email: {
        in: ["body"],
        exists: {
            errorMessage: "Email address is required",
        },
        notEmpty: {
            errorMessage: "email cannot be empty",
        },
        trim: true,
        normalizeEmail: true,
        custom: {
            options: async function (value) {
                if (!isEmail(value)) {
                    throw new Error("Invalid Email Format");
                }
                const user = await User.findOne({ email: value });
                if (user) throw new Error("User already registered");
                return true;
            },
        },
    },
    password: {
        in: ["body"],
        exists: {
            errorMessage: "Password is required",
        },
        notEmpty: {
            errorMessage: "password field cannot be empty",
        },
        isLength: {
            options: [5, 18],
        },
    },
    phonenumber: {
        in: ["body"],
        custom: {
            options: function (val) {
                if (!isMobilePhone(val, ["en-IN"], { strictMode: false })) {
                    throw new Error("provide valid phone number");
                }
                return true;
            },
        },
    },
};

export { userValidationSchema };

// custom: {
//     options: function (val) {
//         const phoneNum =
//             val.spilt("-")[1] || val.startsWith("0")
//                 ? val.slice(1)
//                 : val || val;
//         if (phoneNum.length !== 10)
//             throw new Error(
//                 "Phone number must contain exactly 10 digits"
//             );

//         return true;
//     },
// },
