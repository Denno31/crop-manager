const mongoose = require("mongoose");

const treatmentSchema = mongoose.Schema(
  {
    treatmentDate: { type: Date, required: true },
    status: { type: String, required: true },
    treatmentType: { type: String, required: true },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
      required: true,
    },
    planting: { type: mongoose.Schema.Types.ObjectId, ref: "Planting" },
    productUsed: { type: String },
    quantityOfProduct: { type: Number },
    shortNotes: { type: String },
  },
  {
    timestamps: true,
  }
);

const Treatment = mongoose.model("Treatment", treatmentSchema);
module.exports = { Treatment };
