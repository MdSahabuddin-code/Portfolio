const jwt = require('jsonwebtoken');

const DEFAULT_EXPIRES_IN = '1h';

/**
 * Signs a short-lived JWT access token for an authenticated admin.
 * Keep the payload minimal — only identifiers, never the password hash.
 */
function signAccessToken(admin) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment (.env file).');
  }

  return jwt.sign(
    { sub: admin._id.toString(), role: admin.role },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || DEFAULT_EXPIRES_IN }
  );
}

/**
 * Verifies a JWT access token, throwing if invalid/expired.
 */
function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment (.env file).');
  }
  return jwt.verify(token, secret);
}

/**
 * Returns the cookie options for storing the JWT as an httpOnly cookie.
 * httpOnly protects against XSS reading the token via JavaScript; sameSite
 * guards against basic CSRF; `secure` is enforced in production (HTTPS only).
 */
function getAuthCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 60 * 60 * 1000, // 1 hour, matches default token expiry
    path: '/',
  };
}

module.exports = { signAccessToken, verifyAccessToken, getAuthCookieOptions };
