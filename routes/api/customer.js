const express = require('express');

const ctrl = require('../../controllers/customer');
const { validateBody, validateQuery } = require('../../decorators');
const { authenticate, isValidId } = require('../../middlewares');
const schemas = require('../../schemas/customers');

const addCustomerValidate = validateBody(schemas.customerAddSchema);
const queryParamValidate = validateQuery(schemas.queryParamSchema);

const router = express.Router();
router.use(authenticate);

router.get('/', queryParamValidate, ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', addCustomerValidate, ctrl.add);

router.put('/:id', isValidId, addCustomerValidate, ctrl.updateById);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
