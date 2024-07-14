const { Schema, model } = require('mongoose');
const {
  categoriesList,
  validDecimalNumber,
  transactionsTypeList,
} = require('../constants/constants');
const { handleValidateError, runUpdateValidators } = require('./hooks');

const transactionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for product'],
    },

    amount: {
      type: String,
      required: [true, 'Set price for product'],
      match: [
        validDecimalNumber,
        'amount must be a positive number with no more than 2 decimal places.',
      ],
    },
    type: {
      type: String,
      required: [true, 'Set category for product'],
      enum: {
        values: categoriesList,
        message: `type must be one of the allowed categories ${transactionsTypeList} `,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
transactionSchema.post('save', handleValidateError);
transactionSchema.pre('findOneAndUpdate', runUpdateValidators);
transactionSchema.post('findOneAndUpdate', handleValidateError);

const Transaction = model('transaction', transactionSchema);

module.exports = Transaction;
