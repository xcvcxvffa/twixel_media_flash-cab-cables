import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAccountSettingData,
  updateProfile,
  updatePassword,
} from '../controllers/accountController.js';

const router = express.Router();

router.route('/setting').get(protect, getAccountSettingData);
router.route('/profile').post(protect, updateProfile);
router.route('/password').post(protect, updatePassword);

export default router;
