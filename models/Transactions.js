const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    transactionId: {
      type: String,
      uniquer: true,
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    yearMonth: {
      type: Number,
      ref: "Attendance",
      required: true,
    },
    paymentDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
