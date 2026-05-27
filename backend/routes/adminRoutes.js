import express from "express";
import { loginAdmin, getAdminProfile } from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/profile", protect, getAdminProfile);

export default router;
