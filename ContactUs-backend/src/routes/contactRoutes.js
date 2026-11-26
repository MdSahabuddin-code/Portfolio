const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  submitContactMessage,
  getContactMessages,
  getContactMessageById,
} = require('../controllers/contactController');
const { validateContactSubmission, validateObjectIdParam } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Limit spam/abuse on the public submit endpoint: 10 submissions per 15 minutes per IP.
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact requests from this IP. Please try again later.',
  },
});

// Public: anyone can submit the contact form, no authentication required.
router.post('/', submitLimiter, validateContactSubmission, submitContactMessage);

// Private: viewing submitted messages requires a logged-in admin.
router.get('/', protect, getContactMessages);
router.get('/:id', protect, validateObjectIdParam, getContactMessageById);

module.exports = router;
