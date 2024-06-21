import mongoose from "mongoose";

const expenceSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        amount: String,
        description: String,
        date: Date,
        starMark: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Expence = mongoose.model("Expence", expenceSchema);
export default Expence;
