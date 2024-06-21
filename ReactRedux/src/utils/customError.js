class CustomError extends Error {
    constructor(
        statusCode = 500,
        message = "something went wrong",
        error = []
    ) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}

export { CustomError };
