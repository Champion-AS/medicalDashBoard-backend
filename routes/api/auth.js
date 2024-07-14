const express = require('express');

const ctrl = require('../../controllers/auth');
const { validateBody } = require('../../decorators');

const { authenticate } = require('../../middlewares');
const schemas = require('../../schemas/user');

const signupValidateMiddleware = validateBody(schemas.userSignupSchema);
const signinValidateMiddleware = validateBody(schemas.userSigninSchema);
const refreshValidateMiddleware = validateBody(schemas.refreshSchema);

const router = express.Router();

router.post('/user/signup', signupValidateMiddleware, ctrl.signup);

router.post('/user/signin', signinValidateMiddleware, ctrl.signin);
router.post('/user/refresh', refreshValidateMiddleware, ctrl.refresh);
router.get('/user/current', authenticate, ctrl.getCurrentUserInfo);
router.post('/user/signout', authenticate, ctrl.signout);

module.exports = router;
