require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

(async function start() {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Fail fast / log clearly on unexpected crashes instead of silently dying.
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled promise rejection:', err);
    server.close(() => process.exit(1));
  });
})();
