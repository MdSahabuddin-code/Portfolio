
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// Health Check
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "S-DevWorks Projects API is running",
    timestamp: new Date().toISOString(),
  });
});

// Start Server
const startServer = async () => {
  try {
    console.log("Starting S-DevWorks Projects API...");
    console.log("Connecting to MongoDB...");

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Projects API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
