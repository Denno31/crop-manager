const mongoose = require("mongoose");

const fieldSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    fieldType: { type: String, required: true },
    lightProfile: { type: String, required: true },
    fieldStatus: { type: String, required: true },
    fieldSize: { type: Number },
    shortNotes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);
const Field = mongoose.model("Field", fieldSchema);
module.exports = { Field };
