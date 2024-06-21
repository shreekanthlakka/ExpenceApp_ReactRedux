class ApiError extends Error {
    constructor(status = 500, message = "something went wrong", errors = []) {
        super();
        this.statuCode = status;
        this.error = errors;
        this.data = [];
        this.message = message;
        this.success = status >= 400 ? false : true;
    }
}

export { ApiError };
