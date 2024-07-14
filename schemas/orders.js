const Joi = require('joi');
const {
  validDecimalNumber,
  validStock,
  ordersList,
  validDatePattern,
  validUrlImageExtensions,
} = require('../constants/constants');

const orderAddSchema = Joi.object({
  photo: Joi.string().pattern(validUrlImageExtensions).optional().messages({
    'string.base': 'Photo field should be a string',
    'string.pattern.base':
      'Photo field should be a valid image URL with a proper image extension',
  }),
  name: Joi.string().required().messages({
    'string.base': 'name field should be a string',
  }),
  address: Joi.string().required().messages({
    'string.base': 'address field should be a string',
  }),
  products: Joi.string().pattern(validStock).required().messages({
    'string.base': 'products field should be a string',
    'string.pattern.base':
      'products field should be a string containing a positive integer',
  }),
  order_date: Joi.string().pattern(validDatePattern).optional().messages({
    'string.base': 'date field should be a string',
    'string.pattern.base':
      'date field should be in the format "Month DD, YYYY"',
  }),
  price: Joi.string().pattern(validDecimalNumber).required().messages({
    'string.base': 'price field should be a string',
    'string.pattern.base':
      'price field should be a string containing a positive number with no more than 2 decimal places',
  }),
  status: Joi.string()
    .required()
    .valid(...ordersList)
    .messages({
      'string.base': 'status field should be a string',
      'any.only': `status must be one of the allowed statuses ${ordersList} `,
    }),
});

const queryParamSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(5),
  filterQuery: Joi.string().allow('').optional(),
});

module.exports = {
  orderAddSchema,
  queryParamSchema,
};
