const expenceValidationSchema = {
    categoryId: {
        in: ["body"],
        exists: {
            errorMessage: "Category is required",
        },
        notEmpty: {
            errorMessage: "Category cannot be empty",
        },
        isMongoId: {
            errorMessage: "Invalid Category ID",
        },
    },
    description: {
        in: ["body"],
        trim: true,
    },
    amount: {
        in: ["body"],
        exists: {
            errorMessage: "Amount field is required",
        },
        notEmpty: {
            errorMessage: "Amount cannot be empty.",
        },
        isNumeric: {
            errorMessage: "Amount must be a number",
        },
        custom: {
            options: function (val) {
                if (Number(val) < 0)
                    throw new Error("amount cannot  be negative");
                return true;
            },
        },
    },
    date: {
        in: ["body"],
        exists: {
            errorMessage: "Date field is required",
        },
        notEmpty: {
            errorMessage: "Date cannot be empty.",
        },
        custom: {
            options: function (val) {
                // if (
                //     new Date(val).toISOString().split("T")[0] >=
                //     new Date().toDateString().split("T")[0]
                // ) {
                //     throw new Error("Invalid transaction date.");
                // }
                return true;
            },
        },
    },
};

export { expenceValidationSchema };
