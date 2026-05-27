import Project from "../models/Project.js";
import { cloudinary } from "../config/cloudinary.js";

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
    const image = req.file ? req.file.path : "";

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
        const publicId = project.image.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      }
      project.image = req.file.path;
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
      const publicId = project.image.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
      await cloudinary.uploader.destroy(publicId);
    }

    await project.deleteOne();
    res.json({ message: "Project removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProjects, getProject, createProject, updateProject, deleteProject };
