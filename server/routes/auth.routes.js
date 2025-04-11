import { Router } from "express";
import { fetchUserData, loginUser, registerUser } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/login", loginUser)
router.post("/register", registerUser)
router.get("/me", authenticateToken, fetchUserData)

export default router;