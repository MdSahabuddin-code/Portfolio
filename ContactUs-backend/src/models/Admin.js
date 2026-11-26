const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Admin account used solely to authenticate into protected/private routes
 * (viewing contact submissions, health status, etc). There is no public
 * registration endpoint — admins are created via the `scripts/createAdmin.js`
 * seed script to keep this surface locked down.
 */
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [50, 'Username cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: [254, 'Email cannot exceed 254 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // never return password hash by default on queries
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving whenever it's new/modified.
adminSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
  return next();
});

/**
 * Compares a plaintext candidate password against the stored hash.
 */
adminSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * True if the account is currently locked out due to repeated failed logins.
 */
adminSchema.methods.isLocked = function isLocked() {
  return Boolean(this.lockUntil && this.lockUntil > Date.now());
};

module.exports = mongoose.model('Admin', adminSchema);
