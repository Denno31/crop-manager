const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    field: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ExpenseCategory" },
    expenseAmount: { type: Number, required: true },
    expenseDate: { type: Date, required: true },
    receiptNo: { type: String },
    customerName: { type: String },
    shortNotes: { type: String },
  },
  {
    timestamps: true,
  }
);
const Expense = mongoose.model("Expense", expenseSchema);
module.exports = { Expense };
