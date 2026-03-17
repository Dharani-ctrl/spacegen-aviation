const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/spacegen';
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'spacegen@2026';

async function initializeAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);

    // Create Admin Schema
    const adminSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true, lowercase: true },
      passwordHash: { type: String, required: true },
      email: { type: String, required: true, unique: true, lowercase: true },
      createdAt: { type: Date, default: Date.now },
    });

    const Admin = mongoose.model('Admin', adminSchema);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: adminUsername });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    // Create admin
    const admin = new Admin({
      username: adminUsername,
      passwordHash,
      email: 'admin@spacegen-aviation.com',
    });

    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log(`Username: ${adminUsername}`);
    console.log(`Password: ${adminPassword}`);
    console.log('⚠️  IMPORTANT: Change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing admin:', error);
    process.exit(1);
  }
}

initializeAdmin();
