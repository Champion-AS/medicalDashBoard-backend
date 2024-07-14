const Joi = require('joi');
const {
  statusSuppliersList,
  validDecimalNumber,
  validDatePattern,
} = require('../constants/constants');

const supplierAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name field should be a string',
  }),
  address: Joi.string().required().messages({
    'string.base': 'address field should be a string',
  }),
  suppliers: Joi.string().required().messages({
    'string.base': 'suppliers field should be a string',
  }),
  date: Joi.string().pattern(validDatePattern).required().messages({
    'string.base': 'date field should be a string',
    'string.pattern.base':
      'date field should be in the format "Month DD, YYYY"',
  }),
  amount: Joi.string().pattern(validDecimalNumber).required().messages({
    'string.base': 'amount field should be a string',
    'string.pattern.base':
      'amount field should be a string containing a positive number with no more than 2 decimal places',
  }),
  status: Joi.string()
    .required()
    .valid(...statusSuppliersList)
    .messages({
      'string.base': 'status field should be a string',
      'any.only': `status must be one of the allowed statuses ${statusSuppliersList} `,
    }),
});

const queryParamSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(5),
  filterQuery: Joi.string().allow('').optional(),
});

module.exports = {
  supplierAddSchema,
  queryParamSchema,
};
