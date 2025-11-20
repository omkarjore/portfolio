import mongoose from 'mongoose';
import User from './models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://omkarjore731_db_user:4uV1Jzqg6V7ErM1Y@portfolio-cluster.nnxrmrb.mongodb.net/?appName=portfolio-cluster';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'omkarjore731@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Omkar Jore';

async function seedAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB!');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', ADMIN_EMAIL);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
      role: 'admin',
      isActive: true,
    });

    console.log('Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Name:', admin.name);
    console.log('Role:', admin.role);
    console.log('\nYou can now login with:');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
