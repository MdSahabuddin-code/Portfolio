/**
 * Builds a professional-looking HTML email body for new contact submissions.
 */
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildContactEmailHtml({ name, email, phone, message, ipAddress, submittedAt }) {
  const formattedDate = new Date(submittedAt).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:24px;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background-color:#111827;padding:20px 24px;">
        <h2 style="margin:0;color:#ffffff;font-size:18px;">New Contact Us Submission</h2>
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 16px 0;color:#374151;font-size:14px;">
          You have received a new message through the portfolio website's Contact Us form.
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#111827;">
          <tr>
            <td style="padding:8px 0;width:120px;color:#6b7280;">Name</td>
            <td style="padding:8px 0;font-weight:bold;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;">Email</td>
            <td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#2563eb;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;">Phone</td>
            <td style="padding:8px 0;">${phone ? escapeHtml(phone) : '<em>Not provided</em>'}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;vertical-align:top;">Message</td>
            <td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(message)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;">Submitted at</td>
            <td style="padding:8px 0;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;">IP Address</td>
            <td style="padding:8px 0;">${ipAddress ? escapeHtml(ipAddress) : 'Unknown'}</td>
          </tr>
        </table>
      </div>
      <div style="background-color:#f9fafb;padding:16px 24px;border-top:1px solid #e2e8f0;">
        <p style="margin:0;color:#9ca3af;font-size:12px;">
          This is an automated notification from the Portfolio Contact Us backend. Reply directly to this email to respond to ${escapeHtml(name)}.
        </p>
      </div>
    </div>
  </div>`;
}

function buildContactEmailText({ name, email, phone, message, ipAddress, submittedAt }) {
  const formattedDate = new Date(submittedAt).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return [
    'New Contact Us Submission',
    '--------------------------------',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Message: ${message}`,
    `Submitted at: ${formattedDate}`,
    `IP Address: ${ipAddress || 'Unknown'}`,
  ].join('\n');
}

module.exports = { buildContactEmailHtml, buildContactEmailText };
