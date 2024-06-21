import Category from "../models/category.model.js";

const categoryValidationSchema = {
    categoryname: {
        in: ["body"],
        exists: {
            errorMessage: "Category name is required",
        },
        notEmpty: {
            errorMessage: "Please provide a valid Category Name",
        },
        trim: true,
        custom: {
            options: async function (value) {
                const category = await Category.findOne({
                    categoryname: value,
                });
                if (category) {
                    throw new Error("This category already exists");
                }
                return true;
            },
        },
    },
};

export { categoryValidationSchema };
