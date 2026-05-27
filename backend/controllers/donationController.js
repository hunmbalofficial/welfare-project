import Donation from "../models/Donation.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const submitDonation = async (req, res) => {
  try {
    const { donorName, donorEmail, amount, paymentMethod, transactionId, message } = req.body;
    const screenshot = "";

    if (!donorName || !donorEmail || !amount || !paymentMethod) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const donation = await Donation.create({
      donorName,
      donorEmail,
      amount: Number(amount),
      paymentMethod,
      transactionId,
      screenshot,
      message,
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    if (donation.screenshot) {
      const imagePath = path.join(__dirname, "..", donation.screenshot);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await donation.deleteOne();
    res.json({ message: "Donation removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { submitDonation, getDonations, deleteDonation };
