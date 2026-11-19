# Portfolio — Contact Us Backend

Standalone backend (no frontend yet) for the portfolio project's **Contact Us** page.
Built with **Node.js + Express + MongoDB (Mongoose)**. No authentication — this is a
public contact form API, as requested.

> Versions used: Node.js v22+ (tested on v26) and MongoDB 8.x / local MongoDB service
> with Mongoose ^8. ("Node 26" and "MongoDB 9.x" aren't publicly released yet as of
> today, so this targets the latest currently available stable releases — bump the
> versions in `package.json` / your MongoDB install whenever the newer ones ship.)

## What it does

1. A user submits the Contact Us form (name, email, message required; phone optional).
2. The backend validates the input, saves it to MongoDB (`ContactMessage` collection)
   along with the submission timestamp, IP address, and user agent.
3. A professional HTML notification email is sent to your company inbox via Gmail SMTP
   (free, using an App Password) so you know immediately that someone reached out.
   If email sending fails for any reason, the submission is still saved — email
   delivery never blocks or loses data.
4. Submissions can be listed/viewed via `GET` endpoints while you test — no auth yet.

## Folder structure

```
backend/
  src/
    config/db.js          MongoDB connection
    config/mailer.js       Nodemailer (Gmail SMTP) setup + send function
    models/ContactMessage.js
    controllers/contactController.js
    routes/contactRoutes.js
    middleware/validators.js
    middleware/errorHandler.js
    utils/emailTemplate.js HTML/text email template
    app.js                 Express app (middleware + routes)
  server.js                Entry point
  .env.example             Copy to .env and fill in real values
  postman_collection.json  Import directly into Postman
  package.json
```

## Setup

1. **Install dependencies**
   ```powershell
   cd backend
   npm install
   ```

2. **Configure environment variables**
   ```powershell
   Copy-Item .env.example .env
   ```
   Edit `.env`:
   - `MONGO_URI` — local MongoDB (`mongodb://127.0.0.1:27017/portfolio_contact`) or an
     Atlas connection string.
   - `GMAIL_USER` — the Gmail address to send notifications from.
   - `GMAIL_APP_PASSWORD` — a 16-character **App Password** (not your normal Gmail
     password). Generate one at https://myaccount.google.com/apppasswords — requires
     2-Step Verification to be turned on for that Gmail account.
   - `CONTACT_RECEIVER_EMAIL` — the inbox that should actually receive "someone
     contacted us" emails (can be the same as `GMAIL_USER`, or a different company
     address). Swap this provider out later once a paid transactional email service
     is purchased — only `src/config/mailer.js` needs to change.

3. **Make sure MongoDB is running** (locally or Atlas).

4. **Run the server**
   ```powershell
   npm run dev     # with nodemon, auto-restarts on changes
   # or
   npm start
   ```
   You should see:
   ```
   MongoDB connected: ...
   Server running on http://localhost:5000
   ```

## API Endpoints

| Method | Endpoint             | Description                                   | Auth |
|--------|-----------------------|------------------------------------------------|------|
| GET    | `/health`             | Health check                                   | None |
| POST   | `/api/contact`        | Submit a contact form message                  | None |
| GET    | `/api/contact`        | List submissions (paginated, newest first)     | None |
| GET    | `/api/contact/:id`    | Get one submission by id                        | None |

### POST `/api/contact` — request body

```json
{
  "name": "Priya Sharma",
  "email": "priya.sharma@example.com",
  "phone": "+91-9876543210",
  "message": "Hi, I'd like to discuss a project with you."
}
```
- `name`, `email`, `message` are required.
- `phone` is optional.
- `message` must be 10–5000 characters.

### Success response (201)

```json
{
  "success": true,
  "message": "Thank you for reaching out! Your message has been received and our team has been notified.",
  "data": {
    "_id": "...",
    "name": "Priya Sharma",
    "email": "priya.sharma@example.com",
    "phone": "+91-9876543210",
    "message": "Hi, I'd like to discuss a project with you.",
    "ipAddress": "127.0.0.1",
    "userAgent": "PostmanRuntime/...",
    "submittedAt": "2026-11-19T10:15:00.000Z",
    "emailNotificationSent": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Validation error response (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "A valid email address is required" }
  ]
}
```

## Testing with Postman

1. Import `backend/postman_collection.json` into Postman.
2. It includes a `baseUrl` variable (`http://localhost:5000`) — change it if you run
   on a different port.
3. Run requests in this order:
   - **Health Check** — confirms the server is up.
   - **Submit Contact Form - Success** — saves a message and (if SMTP is configured)
     sends the notification email.
   - **Submit Contact Form - Validation Error** — confirms bad input is rejected with
     field-level errors.
   - **List Contact Submissions** — confirms the message was saved to MongoDB.
   - **Get Contact Submission by Id** — copy an `_id` from the list response into the
     `submissionId` collection variable, then run this request.

## Notes on rate limiting / spam protection

Since there's no authentication, `POST /api/contact` is rate-limited to 10 requests
per 15 minutes per IP address (`express-rate-limit`) to curb spam/abuse. Adjust in
`src/routes/contactRoutes.js` if needed.

## Next steps (not part of this backend-only task)

- A React frontend will later call `POST /api/contact` directly from the UI form.
- CORS is currently wide open (`cors()`); restrict `origin` to the deployed frontend
  domain once it exists.
- Replace Gmail SMTP with a paid transactional email provider once purchased — only
  `src/config/mailer.js` needs to change.
