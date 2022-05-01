const mongoose = require("mongoose");

const harvestSchema = mongoose.Schema(
  {
    harvestDate: { type: Date, required: true },
    plantingToHarvest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Planting",
      required: true,
    },
    qtyHarvested: { type: Number, required: true },
    batch: { type: Number },
    harvestQuality: { type: String },
    isFinalHarvest: { type: Boolean, default: false },
    quantityRejected: { type: Number },
    unitCost: { type: Number },
    income: { type: Number },
    shortNotes: { type: String },
  },
  {
    timestamps: true,
  }
);

const Harvest = mongoose.model("Harvest", harvestSchema);
module.exports = { Harvest };
