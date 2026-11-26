/**
 * Builds the HTML and plain-text notification sent for a new contact
 * submission. The HTML intentionally uses inline styles and tables so it
 * renders consistently across Gmail, Outlook, and mobile mail clients.
 */
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatSubmittedDate(submittedAt) {
  return new Date(submittedAt).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });
}

function buildContactEmailHtml({
  name,
  email,
  phone,
  message,
  ipAddress,
  submittedAt,
  logoCid,
}) {
  const formattedDate = formatSubmittedDate(submittedAt);
  const safeEmail = escapeHtml(email);
  const safeName = escapeHtml(name);
  const logo = logoCid
    ? `<img src="cid:${escapeHtml(logoCid)}" alt="S-DevWorks" width="270" style="display:block;width:270px;max-width:100%;height:auto;border:0;" />`
    : `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="width:42px;height:42px;color:#171717;background:#d6bd8b;font-family:Georgia,'Times New Roman',serif;font-size:27px;font-weight:700;text-align:center;vertical-align:middle;">S</td>
          <td style="padding-left:12px;color:#f5d38a;font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:700;letter-spacing:1px;">S—DevWorks</td>
        </tr>
      </table>`;

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f1eee8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1eee8;">
      <tr>
        <td align="center" style="padding:28px 12px;">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #e5dfd4;">
            <tr>
              <td style="padding:30px 34px;background:#171717;">
                ${logo}
                <div style="margin-top:22px;color:#d6bd8b;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;">NEW CONTACT ENQUIRY</div>
                <div style="margin-top:8px;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;">Someone wants to connect.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 34px 8px;">
                <div style="color:#777064;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;">
                  A new message was submitted through the portfolio Contact Us form.
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 34px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e8e1d7;background:#fbfaf8;">
                  <tr>
                    <td style="padding:18px 20px;border-bottom:1px solid #e8e1d7;">
                      <div style="color:#9b7942;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;">FROM</div>
                      <div style="padding-top:7px;color:#25231f;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:700;">${safeName}</div>
                      <div style="padding-top:5px;font-family:Arial,Helvetica,sans-serif;font-size:13px;"><a href="mailto:${safeEmail}" style="color:#9b7942;text-decoration:none;">${safeEmail}</a></div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 20px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="50%" valign="top">
                            <div style="color:#9b7942;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;">PHONE</div>
                            <div style="padding-top:6px;color:#25231f;font-family:Arial,Helvetica,sans-serif;font-size:13px;">${phone ? escapeHtml(phone) : 'Not provided'}</div>
                          </td>
                          <td width="50%" valign="top">
                            <div style="color:#9b7942;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;">RECEIVED</div>
                            <div style="padding-top:6px;color:#25231f;font-family:Arial,Helvetica,sans-serif;font-size:13px;">${escapeHtml(formattedDate)}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 34px 8px;">
                <div style="color:#9b7942;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;">MESSAGE</div>
                <div style="margin-top:10px;padding:20px;color:#403d37;background:#f8f6f2;border-left:3px solid #d6bd8b;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.8;white-space:pre-wrap;">${escapeHtml(message)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 34px 30px;">
                <a href="mailto:${safeEmail}" style="display:inline-block;padding:13px 20px;background:#b18a4d;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-decoration:none;">REPLY TO ${safeName.toUpperCase()}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 34px;background:#171717;">
                <div style="color:#d6bd8b;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;">S—DEVWORKS</div>
                <div style="padding-top:7px;color:#a8a398;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;">Design with intention. Develop with purpose.</div>
                <div style="padding-top:12px;color:#706d66;font-family:Arial,Helvetica,sans-serif;font-size:10px;">Automated notification · IP: ${ipAddress ? escapeHtml(ipAddress) : 'Unknown'}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildContactEmailText({ name, email, phone, message, ipAddress, submittedAt }) {
  return [
    'S—DevWorks | New Contact Enquiry',
    '================================',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Received: ${formatSubmittedDate(submittedAt)}`,
    '',
    'Message',
    '-------',
    message,
    '',
    `IP Address: ${ipAddress || 'Unknown'}`,
    '',
    'Reply directly to this email to respond to the sender.',
  ].join('\n');
}

module.exports = { buildContactEmailHtml, buildContactEmailText };
