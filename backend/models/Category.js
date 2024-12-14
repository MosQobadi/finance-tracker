const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
  icon: { type: String },
  subcategories: [{ name: String }],
});

module.exports = mongoose.model("Category", categorySchema);
