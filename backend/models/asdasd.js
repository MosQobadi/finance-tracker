const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  note: String,
  date: Date,
  category: String,
  subCategory: String,
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
