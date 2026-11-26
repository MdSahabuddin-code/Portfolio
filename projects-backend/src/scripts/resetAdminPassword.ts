
import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import { hashPassword } from "../services/authService";

dotenv.config();

const resetAdminPassword = async () => {
  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
    }

    if (password.length < 12) {
      throw new Error("Password must be at least 12 characters");
    }

    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is missing");
    }

    await mongoose.connect(mongoURI);

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new Error(`No admin account found for: ${email}`);
    }

    admin.passwordHash = await hashPassword(password);
    await admin.save();

    console.log(`Password reset successfully for: ${email}`);
  } catch (error) {
    console.error("Password reset failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

resetAdminPassword();
