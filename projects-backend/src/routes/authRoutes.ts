
import { Router } from "express";

import {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from "../controllers/authController";

import { protectAdmin } from "../middleware/authMiddleware";

const router = Router();

// Admin login
router.post("/login", loginAdmin);

// Admin logout
router.post("/logout", logoutAdmin);

// Get currently authenticated admin
router.get("/me", protectAdmin, getCurrentAdmin);

export default router;
