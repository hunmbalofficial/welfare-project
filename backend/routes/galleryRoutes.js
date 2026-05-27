import express from "express";
import { getImages, uploadImage, deleteImage } from "../controllers/galleryController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getImages);
router.post("/", protect, upload.single("image"), uploadImage);
router.delete("/:id", protect, deleteImage);

export default router;
