import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    authority: {
      type: [String],
      default: ['admin', 'user'],
    },
    avatar: {
      type: String,
      default: '/img/avatars/thumb-1.jpg',
    },
    title: {
      type: String,
      default: '',
    },
    timeZone: {
      type: String,
      default: 'GMT+8',
    },
    lang: {
      type: String,
      default: 'en',
    },
    syncData: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
