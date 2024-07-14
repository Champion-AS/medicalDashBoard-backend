const { Schema, model } = require('mongoose');
const {
  statusSuppliersList,
  validDecimalNumber,
  validDatePattern,
} = require('../constants/constants');
const { handleValidateError, runUpdateValidators } = require('./hooks');

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for product'],
    },
    address: {
      type: String,
      required: [true, 'Set address for product'],
    },
    suppliers: {
      type: String,
      required: [true, 'Set suppliers for product'],
    },
    date: {
      type: String,
      required: [true, 'Set date for product'],
      match: [
        validDatePattern,
        'date field should be in the format "Month DD, YYYY"',
      ],
    },
    amount: {
      type: String,
      required: [true, 'Set amount for product'],
      match: [
        validDecimalNumber,
        'Amount must be a positive number with no more than 2 decimal places.',
      ],
    },
    status: {
      type: String,
      required: [true, 'Set status for product'],
      enum: {
        values: statusSuppliersList,
        message: `status must be one of the allowed statuses ${statusSuppliersList} `,
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
supplierSchema.post('save', handleValidateError);
supplierSchema.pre('findOneAndUpdate', runUpdateValidators);
supplierSchema.post('findOneAndUpdate', handleValidateError);

const Supplier = model('supplier', supplierSchema);

module.exports = Supplier;
