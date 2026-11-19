const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  submitContactMessage,
  getContactMessages,
  getContactMessageById,
} = require('../controllers/contactController');
const { validateContactSubmission, validateObjectIdParam } = require('../middleware/validators');

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

router.post('/', submitLimiter, validateContactSubmission, submitContactMessage);
router.get('/', getContactMessages);
router.get('/:id', validateObjectIdParam, getContactMessageById);

module.exports = router;
