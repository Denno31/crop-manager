const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema(
  {
    field: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "IncomeCategory" },
    incomeAmount: { type: Number, required: true },
    incomeDate: { type: Date, required: true },
    receiptNo: { type: String },
    customerName: { type: String },
    shortNotes: { type: String },
  },
  {
    timestamps: true,
  }
);
const Income = mongoose.model("Income", incomeSchema);
module.exports = { Income };
