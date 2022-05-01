const mongoose = require("mongoose");

const expenseCategorySchema = mongoose.Schema(
  {
    expenseCategory: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ExpenseCategory = mongoose.model(
  "ExpenseCategory",
  expenseCategorySchema
);
module.exports = { ExpenseCategory };
