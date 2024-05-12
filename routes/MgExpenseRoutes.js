const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getExpenses,
  createExpense,
  updateExpense,
  getSingleImage,
  deleteExpense,
} = require('../controllers/MgExpenseController');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.get('/', authMiddleware, getExpenses);

router.get('/images/:id', authMiddleware, getSingleImage);

router.post('/', authMiddleware, upload.single('imageFile'), createExpense);

router.put('/:id', authMiddleware, updateExpense);

router.delete('/:id', deleteExpense);

module.exports = router;
