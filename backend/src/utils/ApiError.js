class ApiError extends Error { 
    constructor(
        statusCode, 
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            success: false,
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors
        };
    }
}

export { ApiError };
