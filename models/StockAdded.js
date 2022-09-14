const mongoose = require("mongoose");

const stockAddedSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Item" },
    quantity: { type: Number, required: true },
    comment: { type: String },
    addedDate: { type: Date, required: true },
    additionType: {
      type: String,
      enum: ["deduction", "addition"],
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("StockAdded", stockAddedSchema);
