const nodemailer = require('nodemailer');

/**
 * Creates a Nodemailer transporter using Gmail SMTP with an App Password.
 * Set these in .env:
 *   GMAIL_USER=yourgmailaccount@gmail.com
 *   GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx   (16-char App Password, NOT your normal password)
 *   CONTACT_RECEIVER_EMAIL=companyinbox@gmail.com
 *
 * This is deliberately swappable: once a paid transactional provider (SendGrid,
 * Mailgun, SES, etc.) is purchased, only this file needs to change.
 */
function createTransporter() {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.warn(
      'GMAIL_USER / GMAIL_APP_PASSWORD not set — email notifications will be skipped.'
    );
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
}

const transporter = createTransporter();

/**
 * Sends the "new contact form submission" notification email.
 * Resolves to true/false (never throws) so a mail failure never blocks the API response.
 */
async function sendContactNotification({ name, email, phone, message, ipAddress, submittedAt }) {
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL_USER;

  if (!transporter || !receiver) {
    return false;
  }

  const { buildContactEmailHtml, buildContactEmailText } = require('../utils/emailTemplate');

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: receiver,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: buildContactEmailText({ name, email, phone, message, ipAddress, submittedAt }),
      html: buildContactEmailHtml({ name, email, phone, message, ipAddress, submittedAt }),
    });
    return true;
  } catch (error) {
    console.error('Failed to send contact notification email:', error.message);
    return false;
  }
}

module.exports = { sendContactNotification };
