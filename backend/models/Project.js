import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    targetAmount: { type: Number, default: 0 },
    collectedAmount: { type: Number, default: 0 },
    category: { type: String },
    status: { type: String, enum: ["active", "completed", "upcoming", "onhold"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
