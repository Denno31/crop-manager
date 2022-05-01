const mongoose = require("mongoose");

const plantingSchema = mongoose.Schema(
  {
    plantingDate: { type: Date, required: true },
    activityType: { type: String },
    crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
      required: true,
    },
    status: { type: String, required: true },
    fHarvestDate: { type: Date },
    qtyPlanted: { type: Number, required: true },
    estimatedYield: { type: Number },
    distanceBetweenPlants: { type: Number },
    seedCompany: { type: String },
    seedType: { type: String },
    seedLotNumber: { type: String },
    seedOrigin: { type: String },
    shortNotes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const Planting = mongoose.model("Planting", plantingSchema);
module.exports = { Planting };
