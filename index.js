const express = require('express');
const connectDB = require('./config/dbConnection');
const cors = require('cors');
const dotenv = require('dotenv').config();

const authRouter = require('./routes/UserRoutes');
const expenseRouter = require('./routes/MgExpenseRoutes');

connectDB();
const app = express();

const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/auth', authRouter);
app.use('/expense', expenseRouter);

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
