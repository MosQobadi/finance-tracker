const mongoose = require("mongoose");
const Category = require("../models/Category");

// Fetch all categories
const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Adjust query based on authentication if necessary
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching categories" });
  }
};

// Fetch a single category by ID
const fetchCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Find the category by ID
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the category" });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  const { name, color, icon, subcategories } = req.body;

  try {
    const category = await Category.create({
      name,
      color,
      icon,
      subcategories,
    });
    res.json({ category });
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating category" });
  }
};

// Update an existing category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, color, icon, subcategories } = req.body;

  // Validate the category ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  // Validate the required fields
  if (!name || !color || !icon) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Find and update the category
    const category = await Category.findByIdAndUpdate(
      id,
      { name, color, icon, subcategories },
      { new: true, runValidators: true } // Returns the updated document and enforces schema validation
    );

    // If no category is found, return a 404 error
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Respond with the updated category
    res.json({ category });
  } catch (error) {
    console.error("Error updating category:", error);

    // Check if the error is validation-related
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", details: error.errors });
    }

    // General server error
    res
      .status(500)
      .json({ error: "An error occurred while updating category" });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting category" });
  }
};

// Export functions
module.exports = {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
