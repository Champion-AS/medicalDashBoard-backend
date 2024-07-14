const { Schema, model } = require('mongoose');
const {
  ordersList,
  validDecimalNumber,
  validStock,
  validUrlImageExtensions,
  validDatePattern,
} = require('../constants/constants');
const { handleValidateError, runUpdateValidators } = require('./hooks');

const orderSchema = new Schema(
  {
    photo: {
      type: String,
      match: [
        validUrlImageExtensions,
        'Photo field should be a valid image URL with a proper image extension',
      ],
    },
    name: {
      type: String,
      required: [true, 'Set name for product'],
    },
    address: {
      type: String,
      required: [true, 'Set address for product'],
    },
    products: {
      type: String,
      required: [true, 'Set products for product'],
      match: [validStock, 'Products must be a positive integer.'],
    },
    order_date: {
      type: String,
      match: [
        validDatePattern,
        'date field should be in the format "Month DD, YYYY"',
      ],
    },
    price: {
      type: String,
      required: [true, 'Set price for product'],
      match: [
        validDecimalNumber,
        'Price must be a positive number with no more than 2 decimal places.',
      ],
    },
    status: {
      type: String,
      required: [true, 'Set status for product'],
      enum: {
        values: ordersList,
        message: `status must be one of the allowed statuses ${ordersList} `,
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
orderSchema.post('save', handleValidateError);
orderSchema.pre('findOneAndUpdate', runUpdateValidators);
orderSchema.post('findOneAndUpdate', handleValidateError);

const Order = model('order', orderSchema);

module.exports = Order;
