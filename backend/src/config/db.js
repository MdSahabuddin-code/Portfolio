const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the URI supplied via environment variables.
 * Exits the process on failure so the app never runs silently without a DB.
 */
async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('MONGO_URI is not defined in the environment (.env file).');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
