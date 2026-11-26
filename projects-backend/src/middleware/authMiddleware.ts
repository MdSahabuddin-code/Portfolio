
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import Admin from "../models/Admin";

const COOKIE_NAME = "sdevworks_admin_token";

export const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Read JWT from HTTP-only cookie
    const token = req.cookies?.[COOKIE_NAME];

    if (!token || typeof token !== "string") {
      res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
      return;
    }

    // Verify JWT signature
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is missing");
    }

    const decoded = jwt.verify(
      token,
      jwtSecret
    );

    // Validate token payload
    if (
      typeof decoded === "string" ||
      !decoded.adminId ||
      typeof decoded.adminId !== "string" ||
      decoded.role !== "admin"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
      return;
    }

    // Confirm the admin still exists and is active
    const admin = await Admin.findById(decoded.adminId)
      .select("_id name email role isActive");

    if (!admin || !admin.isActive) {
      res.status(401).json({
        success: false,
        message: "Admin account is unavailable",
      });
      return;
    }

    // Make admin details available to the next handler
    res.locals.admin = {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (error) {
    // Invalid, expired or malformed token
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      res.status(401).json({
        success: false,
        message: "Session is invalid or expired. Please log in again.",
      });
      return;
    }

    console.error("Admin authentication error:", error);

    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
