import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// @desc    Get account settings data
// @route   GET /api/account/setting
// @access  Private
export const getAccountSettingData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        profile: {
          name: user.userName, // assuming userName is the Name displayed
          email: user.email,
          title: user.title || '',
          avatar: user.avatar,
          timeZone: user.timeZone || 'GMT+8',
          lang: user.lang || 'en',
          syncData: user.syncData || false,
        },
        loginHistory: [
          {
            type: 'Desktop',
            deviceName: 'Current Session (Mocked)',
            time: Math.floor(Date.now() / 1000),
            location: 'Localhost',
          },
        ],
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   POST /api/account/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.userName = req.body.name || user.userName;
      user.email = req.body.email || user.email;
      user.title = req.body.title || user.title;
      user.avatar = req.body.avatar || user.avatar;
      user.timeZone = req.body.timeZone || user.timeZone;
      user.lang = req.body.lang || user.lang;
      
      // Since syncData can be false, we explicitly check if it's undefined
      if (req.body.syncData !== undefined) {
          user.syncData = req.body.syncData;
      }

      const updatedUser = await user.save();

      res.json({
        name: updatedUser.userName,
        email: updatedUser.email,
        title: updatedUser.title,
        avatar: updatedUser.avatar,
        timeZone: updatedUser.timeZone,
        lang: updatedUser.lang,
        syncData: updatedUser.syncData,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

// @desc    Update password
// @route   POST /api/account/password
// @access  Private
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Check current password
      if (await user.matchPassword(req.body.password)) {
        user.password = req.body.newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });
      } else {
        res.status(400).json({ message: 'Incorrect current password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating password' });
  }
};
