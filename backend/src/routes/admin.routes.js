import { Router } from "express";
import { updateRole, getAllUsers } from "../controllers/admin.controller.js";
import { verifyJwt} from '../middlewares/auth.middleware.js';
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

// Admin routes
router.patch("/update-role", verifyJwt, verifyAdmin, updateRole);
router.get("/getUsers", verifyJwt, verifyAdmin, getAllUsers);

export default router;