import express from "express";
import { submitDonation, getDonations, deleteDonation } from "../controllers/donationController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", submitDonation);
router.get("/", protect, getDonations);
router.delete("/:id", protect, deleteDonation);

export default router;
