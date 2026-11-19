const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const { sendContactNotification } = require('../config/mailer');

/**
 * Extracts the real client IP, accounting for a reverse proxy (e.g. if this
 * is later deployed behind Nginx/Heroku/etc. and "trust proxy" is enabled).
 */
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || req.ip || null;
}

/**
 * POST /api/contact
 * Public endpoint: saves the submission, then fires a notification email.
 */
async function submitContactMessage(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { name, email, phone, message } = req.body;
    const ipAddress = getClientIp(req);
    const userAgent = req.headers['user-agent'] || null;
    const submittedAt = new Date();

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || null,
      message,
      ipAddress,
      userAgent,
      submittedAt,
    });

    const emailSent = await sendContactNotification({
      name,
      email,
      phone,
      message,
      ipAddress,
      submittedAt,
    });

    if (emailSent) {
      contactMessage.emailNotificationSent = true;
      await contactMessage.save();
    }

    return res.status(201).json({
      success: true,
      message: emailSent
        ? 'Thank you for reaching out! Your message has been received and our team has been notified.'
        : 'Your message has been saved. (Email notification could not be sent — please check SMTP configuration.)',
      data: contactMessage,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/contact
 * Lists submissions, newest first — for verifying data while testing in Postman.
 */
async function getContactMessages(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      ContactMessage.find().sort({ submittedAt: -1 }).skip(skip).limit(limit),
      ContactMessage.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      count: messages.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: messages,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/contact/:id
 */
async function getContactMessageById(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const contactMessage = await ContactMessage.findById(req.params.id);
    if (!contactMessage) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    return res.status(200).json({ success: true, data: contactMessage });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitContactMessage, getContactMessages, getContactMessageById };
