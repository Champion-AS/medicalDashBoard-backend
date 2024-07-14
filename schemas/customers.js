const Joi = require('joi');
const {
  validUrlImageExtensions,
  validDecimalNumber,
  emailRegex,
  validDatePattern,
  phoneRegexp,
} = require('../constants/constants');

const customerAddSchema = Joi.object({
  image: Joi.string().pattern(validUrlImageExtensions).optional().messages({
    'string.base': 'image field should be a string',
    'string.pattern.base':
      'image field should be a valid image URL with a proper image extension',
  }),
  name: Joi.string().required().messages({
    'string.base': 'name field should be a string',
  }),
  email: Joi.string().pattern(emailRegex).optional().messages({
    'string.base': 'Email field must be a string',
    'string.pattern.base': 'Invalid email format',
  }),
  spent: Joi.string().pattern(validDecimalNumber).required().messages({
    'string.base': 'spent field should be a string',
    'string.pattern.base':
      'spent field should be a string containing a positive number with no more than 2 decimal places',
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    'string.base': 'Phone field must be a string',
    'string.pattern.base': 'Invalid phone number format',
  }),
  address: Joi.string().required().messages({
    'string.base': 'address field should be a string',
  }),
  register_date: Joi.string().pattern(validDatePattern).optional().messages({
    'string.base': 'register_date field should be a string',
    'string.pattern.base':
      'register_date field should be in the format "Month DD, YYYY"',
  }),
});
const queryParamSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(5),
  filterQuery: Joi.string().allow('').optional(),
});

module.exports = {
  customerAddSchema,
  queryParamSchema,
};
