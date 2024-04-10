const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getExpenses,
  createExpense,
} = require('../controllers/MgExpenseController');

router.get('/', authMiddleware, getExpenses);

router.post('/', authMiddleware, createExpense);

module.exports = router;
