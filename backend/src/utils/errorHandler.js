import { ApiError } from './ApiError.js';

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json(err.toJSON());
    } else {
        // Fallback for unexpected errors
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error",
            errors: []
        });
    }
};

export { errorHandler };
