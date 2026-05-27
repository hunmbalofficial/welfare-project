import Gallery from "../models/Gallery.js";
import { cloudinary } from "../config/cloudinary.js";

const getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const image = await Gallery.create({
      image: req.file.path,
      caption: req.body.caption || "",
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    const publicId = image.image.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
    await cloudinary.uploader.destroy(publicId);

    await image.deleteOne();
    res.json({ message: "Image removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getImages, uploadImage, deleteImage };
