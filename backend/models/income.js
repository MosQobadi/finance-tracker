const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true }, // "income" or "expense"
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: false,
  },
  date: { type: Date, default: Date.now }, // Transaction date
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
