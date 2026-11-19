const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const contactRoutes = require('./routes/contactRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Trust the first proxy hop (useful once deployed behind Nginx/Render/Heroku/etc.)
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors()); // open for now; the React frontend will be added later
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Backend is up and running' });
});

app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
