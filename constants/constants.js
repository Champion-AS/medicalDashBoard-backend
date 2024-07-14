const categoriesList = [
  'Medicine',
  'Heart',
  'Head',
  'Hand',
  'Leg',
  'Dental Care',
  'Skin Care',
  'Eye Care',
  'Vitamins & Supplements',
  'Orthopedic Products',
  'Baby Care',
];
const ordersList = [
  'Completed',
  'Confirmed',
  'Pending',
  'Cancelled',
  'Processing',
  'Shipped',
  'Delivered',
];

const transactionsTypeList = ['Income', 'Expense', 'Error'];

const statusSuppliersList = ['Active', 'Deactive'];
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const phoneRegexp = /^\+380\d{9}$/;

const validUrlImageExtensions = /^https?:\/\/.+\.(jpeg|jpg|png|gif|svg|webp)$/i;
const validDatePattern =
  /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/;

const validDecimalNumber = /^\d+(\.\d{1,2})?$/;
const validStock = /^\d+$/;

module.exports = {
  categoriesList,
  statusSuppliersList,
  validDecimalNumber,
  validStock,
  validUrlImageExtensions,
  validDatePattern,
  ordersList,
  emailRegex,
  phoneRegexp,
  transactionsTypeList,
};
