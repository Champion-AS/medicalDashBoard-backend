const Joi = require('joi');
const {
  validDecimalNumber,
  transactionsTypeList,
} = require('../constants/constants');

const transactionsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name field should be a string',
  }),
  amount: Joi.string().pattern(validDecimalNumber).required().messages({
    'string.base': 'amount field should be a string',
    'string.pattern.base':
      'amount field should be a string containing a positive number with no more than 2 decimal places',
  }),

  type: Joi.string()
    .required()
    .valid(...transactionsTypeList)
    .messages({
      'string.base': 'type transaction field should be a string',
      'any.only': `type transaction must be one of the allowed statuses ${transactionsTypeList} `,
    }),
});

const queryParamSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(5),
  filterQuery: Joi.string().allow('').optional(),
});

module.exports = {
  transactionsAddSchema,
  queryParamSchema,
};
