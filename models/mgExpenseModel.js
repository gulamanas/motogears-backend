const mongoose = require('mongoose');

const mgExpense = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  expenseType: {
    type: String,
    required: true,
  },
  vehicleRegistrationNumber: {
    type: String,
  },
  vehicleMMYT: {
    type: String,
  },
  expenseParticular: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  pendingAmount: {
    type: Number,
    required: true,
  },
  totalExpenseAmount: {
    type: Number,
  },
});

const MgExpense = mongoose.model('MgExpense', mgExpense);

module.exports = MgExpense;
