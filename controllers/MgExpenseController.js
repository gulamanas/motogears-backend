const asyncHandler = require('express-async-handler');
const MgExpense = require('../models/mgExpenseModel');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'ap-southeast-2',
});

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

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const params = {
    Bucket: process.env.BUCKET,
    Key: `${uniqueSuffix}-${req.file.originalname}`,
    Body: req.file.buffer,
  };

  const s3Response = await s3.upload(params).promise();

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
    imageFile: s3Response.Location,
  });

  res.status(201).json(expenses);
});

const updateExpense = asyncHandler(async (req, res) => {
  const id = req.params.id;

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

  const expenses = await MgExpense.findByIdAndUpdate(id, {
    userId,
    expenseType,
    vehicleRegistrationNumber,
    vehicleMMYT,
    expenseParticular,
    paidAmount,
    pendingAmount,
    totalExpenseAmount: parseInt(paidAmount) + parseInt(pendingAmount),
    // imageFile: imagePath,
  });

  res.status(200).json(expenses);
});

const getSingleImage = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const expense = await MgExpense.findById(id);

  const imageUrl = await s3.getSignedUrlPromise('getObject', {
    Bucket: process.env.BUCKET,
    Key: expense.imageFile.split('/').pop(),
    Expires: 3600,
  });

  res.json({ imageUrl });
});

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  getSingleImage,
};
