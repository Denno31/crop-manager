const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    itemDesc: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    units: { type: String, required: true },
    supplierName: { type: String },
    brand: { type: String },
    cost: { type: Number },
    category: {
      type: String,
      enum: ["Fertilizer", "Insecticide", "Herbicide", "Fungicide", "Nutrient"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
