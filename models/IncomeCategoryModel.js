const mongoose = require("mongoose");

const incomeCategorySchema = mongoose.Schema(
  {
    incomeCategory: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const IncomeCategory = mongoose.model("IncomeCategory", incomeCategorySchema);
module.exports = { IncomeCategory };
