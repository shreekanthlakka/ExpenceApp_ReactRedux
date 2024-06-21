class ApiResponce {
    constructor(status, message, data = []) {
        this.status = status;
        this.data = data;
        this.message = message || "Success";
        this.Length = data.length;
        this.success = status < 400;
    }
}

export { ApiResponce };
