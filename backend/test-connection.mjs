import mongoose from "mongoose";

const uri = "mongodb+srv://hunmbalsiddiqui:HF89BJxvtm4LQZKd@cluster0.f94aoma.mongodb.net/welfareDB?retryWrites=true&w=majority&connectTimeoutMS=30000&serverSelectionTimeoutMS=30000";

mongoose.connect(uri)
  .then((c) => {
    console.log("CONNECTED:", c.connection.host);
    process.exit(0);
  })
  .catch((e) => {
    console.log("FAILED:", e.message);
    process.exit(1);
  });
