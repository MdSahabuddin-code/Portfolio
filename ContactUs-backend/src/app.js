const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/auth');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Trust the first proxy hop (useful once deployed behind Nginx/Render/Heroku/etc.)
app.set('trust proxy', 1);

app.use(helmet());

// Only the configured frontend origin may call this API with credentials
// (cookies). Falls back to the local Vite dev server if unset.
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize()); // strips any keys starting with "$" or containing "." to prevent NoSQL injection
app.use(hpp()); // guards against HTTP parameter pollution (duplicate query params)
app.use(morgan('dev'));

// Private: confirms the server is reachable AND that the caller is an authenticated admin.
app.get('/health', protect, (req, res) => {
  res.status(200).json({ success: true, message: 'Backend is up and running' });
});

// Friendly public landing response so hitting the bare root in a browser doesn't look broken.
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio Contact Us API',
    endpoints: {
      health: 'GET /health (admin only)',
      submitContact: 'POST /api/contact (public)',
      listContacts: 'GET /api/contact (admin only)',
      getContactById: 'GET /api/contact/:id (admin only)',
      login: 'POST /api/auth/login (public)',
      logout: 'POST /api/auth/logout (public)',
      me: 'GET /api/auth/me (admin only)',
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
