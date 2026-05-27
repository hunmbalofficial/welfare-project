import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await Admin.findOne({ email: "admin@hopefoundation.org" });

    if (existing) {
      console.log("Admin already exists");
      console.log("Email: admin@hopefoundation.org");
      console.log("Password: admin123");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await Admin.create({
      email: "admin@hopefoundation.org",
      password: hashedPassword,
    });

    console.log("Admin created successfully");
    console.log("Email: admin@hopefoundation.org");
    console.log("Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
