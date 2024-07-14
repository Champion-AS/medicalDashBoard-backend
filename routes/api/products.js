const express = require('express');

const ctrl = require('../../controllers/products');
const { validateBody, validateQuery } = require('../../decorators');
const { authenticate, isValidId } = require('../../middlewares');
const schemas = require('../../schemas/products');

const addProductValidate = validateBody(schemas.productAddSchema);
const queryParamValidate = validateQuery(schemas.queryParamSchema);

const router = express.Router();

router.use(authenticate);

router.get('/', queryParamValidate, ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', addProductValidate, ctrl.add);

router.put('/:id', isValidId, addProductValidate, ctrl.updateById);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
