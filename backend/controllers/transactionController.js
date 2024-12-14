const mongoose = require("mongoose");

const Transaction = require("../models/Transaction");

const fetchTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const fetchTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    // Find the transaction by ID
    const transaction = await Transaction.findById(id).populate(
      "category",
      "name color icon"
    ); // Populate the category

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ transaction });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the transaction" });
  }
};

const createTransaction = async (req, res) => {
  const { title, description, amount, type, categoryId, subcategoryId } =
    req.body;

  try {
    const transaction = await Transaction.create({
      title,
      description,
      amount,
      type,
      categoryId,
      subcategoryId,
    });
    res.json({ transaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating transaction" });
  }
};

const updateTransaction = async (req, res) => {
  const { title, description, amount, type, categoryId, subcategoryId } =
    req.body;
  const transactionId = req.params.id;

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { title, description, amount, type, categoryId, subcategoryId },
      { new: true }
    );
    res.json({ transaction });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating transaction" });
  }
};

const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;

  try {
    await Transaction.findByIdAndDelete(transactionId);
    res.json({ success: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting transaction" });
  }
};

module.exports = {
  fetchTransactions,
  fetchTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
