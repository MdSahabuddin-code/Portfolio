
import { Request, Response } from "express";

import Admin from "../models/Admin";

import {
  comparePassword,
  generateAuthToken,
} from "../services/authService";

// Cookie configuration
const COOKIE_NAME = "sdevworks_admin_token";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

// POST: Admin Login
export const loginAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password, rememberMe } = req.body ?? {};

    // Validate input
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    // Remember Me is enabled only when explicitly true
    const shouldRemember = rememberMe === true;

    // Find admin and include password hash
    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select("+passwordHash");

    // Check admin account
    if (!admin || !admin.isActive) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Verify password
    const isPasswordValid = await comparePassword(
      password,
      admin.passwordHash
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Generate JWT
    const token = generateAuthToken(
      admin._id.toString(),
      shouldRemember
    );

    // Configure cookie lifetime
    const rememberCookieOptions = shouldRemember
      ? { maxAge: 30 * 24 * 60 * 60 * 1000 }
      : {};

    // Store JWT in HTTP-only cookie
    res.cookie(COOKIE_NAME, token, {
      ...cookieOptions,
      ...rememberCookieOptions,
    });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

// POST: Admin Logout
export const logoutAdmin = (
  _req: Request,
  res: Response
) => {
  res.clearCookie(COOKIE_NAME, cookieOptions);

  res.status(200).json({
    success: true,
    message: "Admin logout successful",
  });
};

// GET: Currently Logged-in Admin
export const getCurrentAdmin = (
  _req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    data: res.locals.admin,
  });
};
