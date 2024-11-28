import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";


const router = Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: { status: 429, error: "Too many login attempts. Please try again later." },
});

// Public Routes
router.route("/register").post(registerUser)
router.route("/login").post(loginLimiter, loginUser)

// Protected Routes
router.route("/logout").post(verifyJwt, logoutUser)

export default router; 