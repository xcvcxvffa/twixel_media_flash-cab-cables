import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT
const generateToken = (id) => {
  // Using a secret from env, or a fallback for development
  const secret = process.env.JWT_SECRET || 'fallback_secret_key_12345';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/sign-in
// @access  Public
export const signIn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          userName: user.userName,
          email: user.email,
          authority: user.authority,
          avatar: user.avatar,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Register a new user
// @route   POST /api/sign-up
// @access  Public
export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { userName }] });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      userName,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        user: {
          userName: user.userName,
          email: user.email,
          authority: user.authority,
          avatar: user.avatar,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user
// @route   POST /api/sign-out
// @access  Public
export const signOut = async (req, res) => {
  // Client side handles destroying the token
  res.json(true);
};

// Mock routes for forgot/reset password
export const forgotPassword = async (req, res) => {
  res.json(true);
};

export const resetPassword = async (req, res) => {
  res.json(true);
};
