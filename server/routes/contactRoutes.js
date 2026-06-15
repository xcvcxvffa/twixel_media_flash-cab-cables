import express from 'express';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;
    
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if database is connected, if not, simulate database save (offline mode)
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ MongoDB is offline. Simulating contact save for:', {
        firstName,
        lastName,
        email,
        message
      });
      return res.status(201).json({
        _id: 'offline_' + Math.random().toString(36).substring(2, 9),
        firstName,
        lastName,
        email,
        message,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    const newContact = await Contact.create({
      firstName,
      lastName,
      email,
      message
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
