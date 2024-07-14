const { Schema, model } = require('mongoose');

const { handleValidateError, runUpdateValidators } = require('./hooks');
const { emailRegex } = require('../constants/constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters long'],
      required: [true, 'Password is required'],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post('save', handleValidateError);
userSchema.pre('findOneAndUpdate', runUpdateValidators);
userSchema.post('findOneAndUpdate', handleValidateError);

const User = model('user', userSchema);

module.exports = User;
