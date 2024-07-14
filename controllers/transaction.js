const Transaction = require('../models/Transaction');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const getAll = async (req, res) => {
  const { filterQuery } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 6;
  const skip = (page - 1) * limit;

  const filter = {};
  if (filterQuery) {
    filter.$or = [
      { name: { $regex: filterQuery, $options: 'i' } },
      { amount: { $regex: filterQuery, $options: 'i' } },
      { type: { $regex: filterQuery, $options: 'i' } },
    ];
  }

  const result = await Transaction.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('owner', 'name');

  const total = await Transaction.countDocuments(filter);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
    data: result,
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.findById(id);
  if (!result) {
    throw HttpError(404, `Transaction with this id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Transaction.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Transaction with this id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Transaction with this id=${id} not found`);
  }
  res.json({ message: 'Delete success' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),

  deleteById: ctrlWrapper(deleteById),
};
