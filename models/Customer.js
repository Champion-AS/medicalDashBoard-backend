const { Schema, model } = require('mongoose');
const {
  validDecimalNumber,
  validDatePattern,
  validUrlImageExtensions,
  emailRegex,
  phoneRegexp,
} = require('../constants/constants');
const { handleValidateError, runUpdateValidators } = require('./hooks');

const customerSchema = new Schema(
  {
    image: {
      type: String,
      match: [
        validUrlImageExtensions,
        'Image field should be a valid image URL with a proper image extension',
      ],
    },
    name: {
      type: String,
      required: [true, 'Set name for product'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegex,
      unique: true,
    },
    spent: {
      type: String,
      required: [true, 'Set spent for product'],
      match: [
        validDecimalNumber,
        'Spent must be a positive number with no more than 2 decimal places.',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [phoneRegexp, 'Invalid phone number format'],
    },
    address: {
      type: String,
      required: [true, 'Set address for product'],
    },

    register_date: {
      type: String,
      required: [true, 'Set date for product'],
      match: [
        validDatePattern,
        'register_date field should be in the format "Month DD, YYYY"',
      ],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
customerSchema.post('save', handleValidateError);
customerSchema.pre('findOneAndUpdate', runUpdateValidators);
customerSchema.post('findOneAndUpdate', handleValidateError);

const Customer = model('customer', customerSchema);

module.exports = Customer;
