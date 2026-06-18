import express from 'express';
import {
  signIn,
  signUp,
  signOut,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.post('/sign-out', signOut);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
