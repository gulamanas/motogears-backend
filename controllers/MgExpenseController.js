const asyncHandler = require('express-async-handler');
const MgExpense = require('../models/mgExpenseModel');

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await MgExpense.find().populate('userId', '-password');
  res.json(expenses);
});

const createExpense = asyncHandler(async (req, res) => {
  const {
    userId,
    expenseType,
    vehicleRegistrationNumber,
    vehicleMMYT,
    expenseParticular,
    paidAmount,
    pendingAmount,
  } = req.body;

  if (!userId) {
    throw new Error('User id not found');
  }

  const expenses = await MgExpense.create({
    userId,
    expenseType,
    vehicleRegistrationNumber,
    vehicleMMYT,
    expenseParticular,
    paidAmount,
    pendingAmount,
    totalExpenseAmount: parseInt(paidAmount) + parseInt(pendingAmount),
  });

  res.status(201).json(expenses);
});

module.exports = {
  getExpenses,
  createExpense,
};
