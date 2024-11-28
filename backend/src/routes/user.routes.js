import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

// Public Routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// Protected Routes
router.route("/logout").post(verifyJwt, logoutUser)

export default router; 