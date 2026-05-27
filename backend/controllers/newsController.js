import News from "../models/NewsUpdate.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNewsItem = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const news = await News.create({ title, content, image });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    if (req.body.title) news.title = req.body.title;
    if (req.body.content !== undefined) news.content = req.body.content;

    if (req.file) {
      if (news.image) {
        const oldPath = path.join(__dirname, "..", news.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      news.image = `/uploads/${req.file.filename}`;
    }

    const updated = await news.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.image) {
      const imagePath = path.join(__dirname, "..", news.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await news.deleteOne();
    res.json({ message: "News removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getNews, getNewsItem, createNews, updateNews, deleteNews };
