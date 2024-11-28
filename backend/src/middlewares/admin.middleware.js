import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
    try {
        const {role} = req.user;

        if(role === 'admin') {
            next();
        }
        else {
            throw new ApiError(409, "Access Denied. You are not an admin");
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while verifying admin status.",
        });
    }
})