
import mongoose, { Schema, Document } from "mongoose";

// 1. Define the structure of a project
export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;

  technologies: string[];
  developers: string[];

  githubUrl?: string;
  youtubeUrl?: string;
  liveUrl?: string;

  thumbnail?: string;
  images: string[];

  featured: boolean;
  published: boolean;
}

// 2. Create the MongoDB schema
const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Project category is required"],
      trim: true,
    },

    technologies: {
      type: [String],
      required: true,
      default: [],
    },

    developers: {
      type: [String],
      required: true,
      default: [],
    },

    githubUrl: {
      type: String,
      trim: true,
    },

    youtubeUrl: {
      type: String,
      trim: true,
    },

    liveUrl: {
      type: String,
      trim: true,
    },

    thumbnail: {
      type: String,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create and export the Project model
const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
