const express = require('express');

const ctrl = require('../../controllers/transaction');
const { validateBody } = require('../../decorators');
const { isValidId, authenticate } = require('../../middlewares');
const schemas = require('../../schemas/transactions');

const addTransactionValidate = validateBody(schemas.transactionAddSchema);

const router = express.Router();
router.use(authenticate);

router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', addTransactionValidate, ctrl.add);

router.put('/:id', isValidId, addTransactionValidate, ctrl.updateById);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
