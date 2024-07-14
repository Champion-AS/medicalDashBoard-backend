const Joi = require('joi');
const {
  categoriesList,
  validDecimalNumber,
  validStock,
  validUrlImageExtensions,
} = require('../constants/constants');

const productAddSchema = Joi.object({
  photo: Joi.string().pattern(validUrlImageExtensions).optional().messages({
    'string.base': 'Photo field should be a string',
    'string.pattern.base':
      'Photo field should be a valid image URL with a proper image extension',
  }),
  name: Joi.string().required().messages({
    'string.base': 'name field should be a string',
  }),
  suppliers: Joi.string().required().messages({
    'string.base': 'suppliers field should be a string',
  }),
  stock: Joi.string().pattern(validStock).required().messages({
    'string.base': 'stock field should be a string',
    'string.pattern.base':
      'stock field should be a string containing a positive integer',
  }),
  price: Joi.string().pattern(validDecimalNumber).required().messages({
    'string.base': 'price field should be a string',
    'string.pattern.base':
      'price field should be a string containing a positive number with no more than 2 decimal places',
  }),
  category: Joi.string()
    .required()
    .valid(...categoriesList)
    .messages({
      'string.base': 'category field should be a string',
      'any.only': `category must be one of the allowed categories ${categoriesList} `,
    }),
});

const queryParamSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(5),
  filterQuery: Joi.string().allow('').optional(),
});

module.exports = {
  productAddSchema,
  queryParamSchema,
};
