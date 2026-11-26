/**
 * One-time CLI script to create (or update) the Admin account.
 * There is deliberately no public "register admin" HTTP endpoint — this
 * keeps admin creation out of reach of the public API surface.
 *
 * Usage (from the backend/ folder):
 *   node scripts/createAdmin.js --username=admin --email=admin@example.com --password=ChangeMe123!
 *
 * Or set ADMIN_USERNAME / ADMIN_EMAIL / ADMIN_PASSWORD in your shell/.env
 * and simply run: node scripts/createAdmin.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg) => {
    const match = arg.match(/^--([^=]+)=(.*)$/);
    if (match) {
      args[match[1]] = match[2];
    }
  });
  return args;
}

async function main() {
  const args = parseArgs();

  const username = args.username || process.env.ADMIN_USERNAME;
  const email = (args.email || process.env.ADMIN_EMAIL || '').toLowerCase();
  const password = args.password || process.env.ADMIN_PASSWORD;

  if (!username || !email || !password) {
    console.error(
      'Missing required fields. Provide --username, --email and --password (or ADMIN_USERNAME / ADMIN_EMAIL / ADMIN_PASSWORD env vars).'
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment (.env file).');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ email });
  if (existing) {
    existing.username = username;
    existing.password = password; // pre-save hook re-hashes since the field changed
    await existing.save();
    console.log(`Updated existing admin: ${email}`);
  } else {
    await Admin.create({ username, email, password });
    console.log(`Created new admin: ${email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((error) => {
  console.error('Failed to create/update admin:', error.message);
  process.exit(1);
});
