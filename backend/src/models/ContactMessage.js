const mongoose = require('mongoose');

/**
 * Stores each Contact Us submission from the portfolio site.
 * No authentication is attached to these documents — the form is public.
 */
const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'Email cannot exceed 254 characters'],
    },
    phone: {
      type: String,
      trim: true,
      default: null,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    emailNotificationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt as well
  }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
