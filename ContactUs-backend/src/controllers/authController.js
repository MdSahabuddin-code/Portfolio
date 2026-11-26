const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const { signAccessToken, getAuthCookieOptions } = require('../config/jwt');

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function formatValidationErrors(errors) {
  return errors.array().map((e) => ({ field: e.type === 'field' ? e.path : e.type, message: e.msg }));
}

/**
 * POST /api/auth/login
 * Public endpoint (rate-limited) — authenticates an admin and issues a JWT
 * as an httpOnly cookie. Uses a generic error message on failure so an
 * attacker can't tell whether the email or the password was wrong, and
 * locks the account out temporarily after repeated failures.
 */
async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formatValidationErrors(errors),
      });
    }

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select(
      '+password +failedLoginAttempts +lockUntil'
    );

    const genericErrorResponse = () =>
      res.status(401).json({ success: false, message: 'Invalid email or password.' });

    if (!admin) {
      return genericErrorResponse();
    }

    if (admin.isLocked()) {
      return res.status(423).json({
        success: false,
        message: 'Account temporarily locked due to repeated failed login attempts. Try again later.',
      });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      admin.failedLoginAttempts += 1;
      if (admin.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
        admin.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);
        admin.failedLoginAttempts = 0;
      }
      await admin.save();
      return genericErrorResponse();
    }

    admin.failedLoginAttempts = 0;
    admin.lockUntil = null;
    admin.lastLoginAt = new Date();
    await admin.save();

    const token = signAccessToken(admin);
    res.cookie('token', token, getAuthCookieOptions());

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token, // also returned for Postman/API testing convenience
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLoginAt: admin.lastLoginAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/logout
 * Clears the auth cookie. Safe to call even if not authenticated.
 */
function logout(req, res) {
  res.clearCookie('token', { ...getAuthCookieOptions(), maxAge: 0 });
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
}

/**
 * GET /api/auth/me
 * Protected — returns the currently authenticated admin's profile.
 * Used by the frontend on load to check whether the session is still valid.
 */
function me(req, res) {
  const { admin } = req;
  return res.status(200).json({
    success: true,
    data: {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      lastLoginAt: admin.lastLoginAt,
    },
  });
}

module.exports = { login, logout, me };
