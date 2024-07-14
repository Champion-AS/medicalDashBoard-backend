const express = require('express');

const ctrl = require('../../controllers/orders');
const { validateBody, validateQuery } = require('../../decorators');
const { isValidId, authenticate } = require('../../middlewares');
const schemas = require('../../schemas/orders');

const addOrderValidate = validateBody(schemas.orderAddSchema);
const queryParamValidate = validateQuery(schemas.queryParamSchema);

const router = express.Router();
router.use(authenticate);

router.get('/', queryParamValidate, ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', addOrderValidate, ctrl.add);

router.put('/:id', isValidId, addOrderValidate, ctrl.updateById);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
