import express from "express";
import cors from "cors";
import connectDB from "../config/db.js";
import { errorHandler } from "../middleware/errorMiddleware.js";
import adminRoutes from "../routes/adminRoutes.js";
import projectRoutes from "../routes/projectRoutes.js";
import donationRoutes from "../routes/donationRoutes.js";
import galleryRoutes from "../routes/galleryRoutes.js";
import newsRoutes from "../routes/newsRoutes.js";
import contactRoutes from "../routes/contactRoutes.js";
import settingRoutes from "../routes/settingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/settings", settingRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Hope Foundation API is running" });
});

app.get("/", (req, res) => {
  res.json({ message: "Hope Foundation API is running" });
});

app.use(errorHandler);

let ready = false;

export default async (req, res) => {
  if (!ready) {
    try {
      await connectDB();
      ready = true;
    } catch (err) {
      console.error("DB error:", err.message);
    }
  }
  app(req, res);
};
