const Joi = require('joi');
const { emailRegex } = require('../constants/constants');

const userSignupSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name field should be a string',
  }),
  email: Joi.string().pattern(emailRegex).optional().messages({
    'string.base': 'Email field must be a string',
    'string.pattern.base': 'Invalid email format',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'password field should be a string',
    'string.min': 'password must be at least 6 characters long',
  }),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).optional().messages({
    'string.base': 'Email field must be a string',
    'string.pattern.base': 'Invalid email format',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'password field should be a string',
    'string.min': 'password must be at least 6 characters long',
  }),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'string.base': 'refreshToken field should be a string',
  }),
});

module.exports = {
  userSignupSchema,
  userSigninSchema,
  refreshSchema,
};
