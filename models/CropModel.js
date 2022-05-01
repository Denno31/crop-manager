const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true },
    harvestUnit: { type: String, required: true },
    shortNotes: { type: String },
    varieties: { type: Number, default: 0 },
    plantings: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);
const Crop = mongoose.model("Crop", cropSchema);
module.exports = { Crop };
