import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true },
    donorEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["jazzcash", "easypaisa", "bank"] },
    transactionId: { type: String },
    screenshot: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
