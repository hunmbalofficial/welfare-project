import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    throw error;
  }
};

export default connectDB;
