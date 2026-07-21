import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const updatePassword = async () => {
  try {
    await connectDB();
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cardtechno.com';
    const newPassword = process.env.ADMIN_PASSWORD;

    if (!newPassword) {
      console.log('Please set ADMIN_PASSWORD in your .env file first.');
      process.exit(1);
    }

    const admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      console.log(`Admin user with email ${adminEmail} not found!`);
      process.exit(1);
    }

    admin.password = newPassword;
    await admin.save();
    
    console.log(`Successfully updated the password for ${adminEmail} in the database.`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating password:', error.message);
    process.exit(1);
  }
};

updatePassword();
