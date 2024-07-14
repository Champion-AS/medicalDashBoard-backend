const { Schema, model } = require('mongoose');
const {
  categoriesList,
  validDecimalNumber,
  validStock,
  validUrlImageExtensions,
} = require('../constants/constants');
const { handleValidateError, runUpdateValidators } = require('./hooks');

const productSchema = new Schema(
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
    suppliers: {
      type: String,
      required: [true, 'Set suppliers for product'],
    },
    stock: {
      type: String,
      required: [true, 'Set stock for product'],
      match: [validStock, 'Stock must be a positive integer.'],
    },
    price: {
      type: String,
      required: [true, 'Set price for product'],
      match: [
        validDecimalNumber,
        'Price must be a positive number with no more than 2 decimal places.',
      ],
    },
    category: {
      type: String,
      required: [true, 'Set category for product'],
      enum: {
        values: categoriesList,
        message: `category must be one of the allowed categories ${categoriesList} `,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    // favorite: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  { versionKey: false, timestamps: true }
);
productSchema.post('save', handleValidateError);
productSchema.pre('findOneAndUpdate', runUpdateValidators);
productSchema.post('findOneAndUpdate', handleValidateError);

const Product = model('product', productSchema);

module.exports = Product;
