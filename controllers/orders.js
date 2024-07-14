const Order = require('../models/Order');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const getAll = async (req, res) => {
  const { filterQuery } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const filter = {};
  if (filterQuery) {
    filter.$or = [
      { name: { $regex: filterQuery, $options: 'i' } },
      { address: { $regex: filterQuery, $options: 'i' } },
      { products: { $regex: filterQuery, $options: 'i' } },
      { price: { $regex: filterQuery, $options: 'i' } },
      { status: { $regex: filterQuery, $options: 'i' } },
    ];
  }

  const result = await Order.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('owner', 'name');

  const total = await Order.countDocuments(filter);

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
  const result = await Order.findById(id);
  if (!result) {
    throw HttpError(404, `Order with this id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Order.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Order.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Order with this id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Order.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Order with this id=${id} not found`);
  }
  res.json({ message: 'Delete success' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  // updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
