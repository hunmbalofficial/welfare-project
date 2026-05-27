import Project from "../models/Project.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, targetAmount, collectedAmount, category, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const project = await Project.create({
      title,
      description,
      image,
      targetAmount: Number(targetAmount) || 0,
      collectedAmount: Number(collectedAmount) || 0,
      category,
      status: status || "active",
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const { title, description, targetAmount, collectedAmount, category, status } = req.body;

    if (title) project.title = title;
    if (description !== undefined) project.description = description;
    if (targetAmount !== undefined) project.targetAmount = Number(targetAmount);
    if (collectedAmount !== undefined) project.collectedAmount = Number(collectedAmount);
    if (category !== undefined) project.category = category;
    if (status !== undefined) project.status = status;

    if (req.file) {
      if (project.image) {
        const oldPath = path.join(__dirname, "..", project.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      project.image = `/uploads/${req.file.filename}`;
    }

    const updated = await project.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.image) {
      const imagePath = path.join(__dirname, "..", project.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await project.deleteOne();
    res.json({ message: "Project removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProjects, getProject, createProject, updateProject, deleteProject };
