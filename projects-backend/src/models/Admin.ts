
import mongoose, { Document, Schema } from "mongoose";

// Admin document structure
export interface IAdmin extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "admin";
  isActive: boolean;
}

// Admin schema
const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Admin email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
      select: false,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create Admin model
const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
