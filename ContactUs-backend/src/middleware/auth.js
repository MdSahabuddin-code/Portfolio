const { verifyAccessToken } = require('../config/jwt');
const Admin = require('../models/Admin');

/**
 * Extracts the JWT from either the httpOnly cookie (preferred) or a
 * Bearer Authorization header (useful for API testing via Postman).
 */
function extractToken(req) {
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }

  return null;
}

/**
 * Protects a route: requires a valid, non-expired JWT belonging to an
 * existing Admin account. Attaches the admin document (minus password) to
 * req.admin for downstream handlers.
 */
async function protect(req, res, next) {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in as an admin.',
      });
    }

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session. Please log in again.',
      });
    }

    const admin = await Admin.findById(decoded.sub);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account no longer exists.',
      });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = { protect };
