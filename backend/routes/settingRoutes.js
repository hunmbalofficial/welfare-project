import express from "express";
import { getSetting, updateSetting } from "../controllers/settingController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/public/:key", getSetting);
router.get("/:key", protect, getSetting);
router.put("/:key", protect, updateSetting);

export default router;
