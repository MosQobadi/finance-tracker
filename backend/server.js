// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/database");
const transactionsController = require("./controllers/transactionController");
const categoriesController = require("./controllers/categoryController");
// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routing

// Routing for categories
app.get("/categories", categoriesController.fetchCategories);
app.get("/category/:id", categoriesController.fetchCategoryById);
app.post("/categories", categoriesController.createCategory);
app.put("/categories/:id", categoriesController.updateCategory);
app.delete("/categories/:id", categoriesController.deleteCategory);

// Routing for transactions
app.get("/transactions", transactionsController.fetchTransactions);
app.get("/transaction/:id", transactionsController.fetchTransactionById);
app.post("/transactions", transactionsController.createTransaction);
app.put("/transactions/:id", transactionsController.updateTransaction);
app.delete("/transactions/:id", transactionsController.deleteTransaction);

// Start our server
app.listen(process.env.PORT);
