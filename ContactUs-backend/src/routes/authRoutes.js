const express = require('express');
const rateLimit = require('express-rate-limit');
const { login, logout, me } = require('../controllers/authController');
const { validateAdminLogin } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Brute-force protection: 5 login attempts per 15 minutes per IP, on top of
// the per-account lockout implemented in the controller.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this IP. Please try again later.',
  },
});

router.post('/login', loginLimiter, validateAdminLogin, login);
router.post('/logout', logout);
router.get('/me', protect, me);

module.exports = router;
