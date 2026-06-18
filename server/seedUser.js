import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Check if admin user exists
    const adminExists = await User.findOne({ userName: 'admin' });

    if (!adminExists) {
      const adminUser = new User({
        userName: 'admin',
        email: 'admin@flashcabcables.com',
        password: 'password123', // Will be hashed by pre-save hook
        authority: ['admin', 'user'],
        avatar: '/img/avatars/thumb-1.jpg'
      });

      await adminUser.save();
      console.log('Admin user seeded successfully!');
    } else {
      console.log('Admin user already exists.');
    }

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
