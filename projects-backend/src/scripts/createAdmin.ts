
import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import { hashPassword } from "../services/authService";

dotenv.config();

const createAdmin = async () => {
  try {
    const name = process.env.ADMIN_NAME?.trim();
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error(
        "Please provide ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env"
      );
    }

    if (password.length < 12) {
      throw new Error("Admin password must be at least 12 characters long");
    }

    await mongoose.connect(process.env.MONGODB_URI!);

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log(`Admin account already exists for: ${email}`);
      return;
    }

    const passwordHash = await hashPassword(password);

    await Admin.create({
      name,
      email,
      passwordHash,
      role: "admin",
      isActive: true,
    });

    console.log(`Admin account created successfully for: ${email}`);
  } catch (error) {
    console.error("Admin creation failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
