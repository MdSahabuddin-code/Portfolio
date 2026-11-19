const { body, param } = require('express-validator');

/**
 * Validation rules for POST /api/contact
 * name, email, message required; phone optional.
 */
const validateContactSubmission = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('A valid email address is required')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters')
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage('Phone number contains invalid characters'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters'),
];

const validateObjectIdParam = [
  param('id').isMongoId().withMessage('Invalid submission id'),
];

module.exports = { validateContactSubmission, validateObjectIdParam };
