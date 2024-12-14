const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Category = require("../models/Category");

// Get all transactions (with optional filters)
router.get("/", async (req, res) => {
  const { type, categoryId } = req.query;

  try {
    const filter = {};
    if (type) filter.type = type; // Filter by income or expense
    if (categoryId) filter.categoryId = categoryId; // Filter by category

    const transactions = await Transaction.find(filter).populate(
      "categoryId subcategoryId"
    );
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new transaction
router.post("/", async (req, res) => {
  const { type, amount, description, categoryId, subcategoryId, date } =
    req.body;

  try {
    // Validate category and subcategory
    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(400).json({ error: "Invalid category ID" });

    if (
      subcategoryId &&
      !category.subcategories.some((sub) => sub._id.equals(subcategoryId))
    ) {
      return res.status(400).json({ error: "Invalid subcategory ID" });
    }

    // Create transaction
    const newTransaction = new Transaction({
      type,
      amount,
      description,
      categoryId,
      subcategoryId,
      date,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a transaction
router.put("/:id", async (req, res) => {
  const { type, amount, description, categoryId, subcategoryId, date } =
    req.body;

  try {
    // Validate category and subcategory (optional)
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category)
        return res.status(400).json({ error: "Invalid category ID" });

      if (
        subcategoryId &&
        !category.subcategories.some((sub) => sub._id.equals(subcategoryId))
      ) {
        return res.status(400).json({ error: "Invalid subcategory ID" });
      }
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { type, amount, description, categoryId, subcategoryId, date },
      { new: true } // Return the updated document
    );

    res.json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
