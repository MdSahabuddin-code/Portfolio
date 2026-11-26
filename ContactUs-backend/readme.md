# Portfolio — Contact Us Backend

Backend for the portfolio project's **Contact Us** page, plus an **Admin** area
(JWT-protected) used to review submissions. Built with **Node.js + Express +
MongoDB (Mongoose)**.

- Public API (`POST /api/contact`) — **no authentication**, as requested.
- Admin-only API (`GET /health`, `GET /api/contact`, `GET /api/contact/:id`) —
  requires a logged-in Admin (JWT access token, sent as an httpOnly cookie).
- A companion React frontend lives in `../frontend` (sibling folder) — see its own
  README for setup.

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
    config/db.js            MongoDB connection
    config/mailer.js        Nodemailer (Gmail SMTP) setup + send function
    config/jwt.js            JWT sign/verify + cookie options
    models/ContactMessage.js
    models/Admin.js          Admin account (hashed password, lockout fields)
    controllers/contactController.js
    controllers/authController.js  login / logout / me
    routes/contactRoutes.js
    routes/authRoutes.js
    middleware/validators.js
    middleware/auth.js       `protect` — JWT auth middleware for admin routes
    middleware/errorHandler.js
    utils/emailTemplate.js   HTML/text email template
    app.js                   Express app (middleware + routes)
  scripts/createAdmin.js     CLI script to create/update the admin account
  server.js                  Entry point
  .env.example               Copy to .env and fill in real values
  postman_collection.json    Import directly into Postman
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
   - `JWT_SECRET` — a long random string used to sign admin access tokens. Generate
     one with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - `JWT_EXPIRES_IN` — access token lifetime (default `1h`).
   - `FRONTEND_URL` — the frontend origin allowed by CORS (default
     `http://localhost:5173`, Vite's default port). Must exactly match the origin the
     frontend runs on, including protocol and port, or the browser will block requests.
   - `NODE_ENV` — `development` locally; set to `production` on a real deployment so
     cookies get the `secure` flag (HTTPS only).
   - `ADMIN_USERNAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` — only used by the seed
     script below, to create the first admin account.

3. **Make sure MongoDB is running** (locally or Atlas).

4. **Create the first Admin account** (there is no public registration endpoint —
   admins are only created via this CLI script, which keeps account creation off the
   public API surface):
   ```powershell
   node scripts/createAdmin.js
   # or override the .env values inline:
   node scripts/createAdmin.js --username=admin --email=admin@example.com --password=ChangeMe123!
   ```
   Running it again with the same email updates that admin's username/password
   instead of creating a duplicate.

5. **Run the server**
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

| Method | Endpoint             | Description                                   | Auth        |
|--------|-----------------------|------------------------------------------------|-------------|
| GET    | `/health`             | Health check                                   | Admin (JWT) |
| POST   | `/api/contact`        | Submit a contact form message                  | None        |
| GET    | `/api/contact`        | List submissions (paginated, newest first)     | Admin (JWT) |
| GET    | `/api/contact/:id`    | Get one submission by id                        | Admin (JWT) |
| POST   | `/api/auth/login`     | Admin login (sets httpOnly cookie + returns token) | None    |
| POST   | `/api/auth/logout`    | Clears the auth cookie                          | Admin (JWT) |
| GET    | `/api/auth/me`        | Current admin profile (session check)           | Admin (JWT) |

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
- `message` must be 5–1000 characters.

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
   - **Admin Login** — log in with the account created via `scripts/createAdmin.js`.
     Postman's cookie jar will store the `token` cookie automatically for the rest of
     the requests in this collection (make sure "Automatically follow redirects" and
     cookie handling are enabled, which is Postman's default).
   - **Health Check** — confirms the server is up (requires login above).
   - **Submit Contact Form - Success** — public, saves a message and (if SMTP is
     configured) sends the notification email.
   - **Submit Contact Form - Validation Error** — confirms bad input is rejected with
     field-level errors.
   - **List Contact Submissions** — requires login; confirms the message was saved.
   - **Get Contact Submission by Id** — copy an `_id` from the list response into the
     `submissionId` collection variable, then run this request (requires login).
   - **Admin Logout** — clears the cookie; subsequent admin requests will 401 again.

## Notes on rate limiting / spam protection

Since there's no authentication, `POST /api/contact` is rate-limited to 10 requests
per 15 minutes per IP address (`express-rate-limit`) to curb spam/abuse. Adjust in
`src/routes/contactRoutes.js` if needed.

## Admin authentication

- `POST /api/auth/login` — body `{ "email": "...", "password": "..." }`. On success:
  - Sets a `token` **httpOnly cookie** (JWT, 1-hour expiry) — this is what the React
    frontend uses automatically on every request (`withCredentials: true`).
  - Also returns the same JWT in the JSON response body (`token` field) so it can be
    tested directly in Postman with an `Authorization: Bearer <token>` header,
    without relying on cookie support.
  - Generic `"Invalid email or password"` error on failure (no user enumeration).
  - After 5 failed attempts for the same account, that account is locked for 15
    minutes, in addition to IP-based rate limiting (5 attempts / 15 min) on the route.
- `POST /api/auth/logout` — clears the cookie.
- `GET /api/auth/me` — returns the logged-in admin's profile; used by the frontend
  to restore the session on page refresh.
- Protected routes accept the token either as the `token` cookie **or** an
  `Authorization: Bearer <token>` header — whichever is present.
- There is **no public admin registration endpoint** by design — only
  `scripts/createAdmin.js` can create admin accounts, since exposing registration
  over HTTP would let anyone create an admin account.

## Security hardening

- Passwords hashed with `bcryptjs` (12 salt rounds), never stored or returned in
  plain text (`select: false` on the schema field).
- JWT access tokens, httpOnly cookies (`secure` in production, `sameSite: strict`
  in production / `lax` in development).
- `express-mongo-sanitize` — strips `$`/`.` operators from user input to prevent
  NoSQL injection.
- `hpp` — guards against HTTP parameter pollution.
- `helmet` — sets standard security headers (CSP, HSTS, X-Frame-Options, etc.).
- CORS restricted to `FRONTEND_URL` with `credentials: true` (not a wide-open `cors()`).
- Rate limiting on both the public contact form and the admin login route.
- Account lockout after repeated failed logins (defense in depth alongside IP rate
  limiting).

## Next steps

- The React frontend (`../frontend`) already calls every endpoint above — see its
  README for setup/run instructions.
- Replace Gmail SMTP with a paid transactional email provider once purchased — only
  `src/config/mailer.js` needs to change.
- If deployed, update `FRONTEND_URL` to the real deployed frontend origin, and set
  `NODE_ENV=production` so cookies get the `secure` flag (HTTPS required then).
