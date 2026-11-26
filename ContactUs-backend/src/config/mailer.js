const nodemailer = require('nodemailer');

/**
 * Creates a Nodemailer transporter using Gmail SMTP with an App Password.
 * Set these in .env:
 *   GMAIL_USER=yourgmailaccount@gmail.com
 *   GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx   (16-char App Password, NOT your normal password)
 *   CONTACT_RECEIVER_EMAILS=["companyinbox@gmail.com","owner@example.com"]
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

  const allowSelfSignedCertificate =
    process.env.NODE_ENV !== 'production' &&
    process.env.SMTP_ALLOW_SELF_SIGNED_CERT === 'true';

  if (allowSelfSignedCertificate) {
    console.warn(
      'SMTP certificate verification is disabled for local development only.'
    );
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
    ...(allowSelfSignedCertificate
      ? { tls: { rejectUnauthorized: false } }
      : {}),
  });
}

const transporter = createTransporter();

function getContactReceivers() {
  const configuredRecipients = process.env.CONTACT_RECEIVER_EMAILS;

  if (configuredRecipients) {
    try {
      const parsed = JSON.parse(configuredRecipients);
      if (!Array.isArray(parsed)) {
        console.warn('CONTACT_RECEIVER_EMAILS must be a JSON array.');
        return [];
      }

      const recipients = parsed
          .map((recipient) => String(recipient).trim())
          .filter((recipient) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient));

      if (recipients.length !== parsed.length) {
        console.warn('CONTACT_RECEIVER_EMAILS contains one or more invalid email addresses.');
      }

      return [...new Set(recipients)];
    } catch (error) {
      console.warn('CONTACT_RECEIVER_EMAILS is not valid JSON — email notifications will be skipped.');
      return [];
    }
  }

  const fallback = process.env.CONTACT_RECEIVER_EMAIL;
  return fallback ? [fallback.trim()] : [];
}

/**
 * Sends the "new contact form submission" notification email.
 * Resolves to true/false (never throws) so a mail failure never blocks the API response.
 */
async function sendContactNotification({ name, email, phone, message, ipAddress, submittedAt }) {
  const receivers = getContactReceivers();

  if (!transporter || receivers.length === 0) {
    return false;
  }

  const { buildContactEmailHtml, buildContactEmailText } = require('../utils/emailTemplate');
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: receivers,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: buildContactEmailText({ name, email, phone, message, ipAddress, submittedAt }),
      html: buildContactEmailHtml({
        name,
        email,
        phone,
        message,
        ipAddress,
        submittedAt,
        logoCid: null,
      }),
    });
    return true;
  } catch (error) {
    console.error('Failed to send contact notification email:', error.message);
    return false;
  }
}

module.exports = { sendContactNotification };
