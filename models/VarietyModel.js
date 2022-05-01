const mongoose = require("mongoose");

const varietySchema = new mongoose.Schema({
  name: { type: String, required: true },
  crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
  lightProfile: { type: String },
  fieldType: { type: String },
  daysToMaturity: { type: Number, required: true },
  harvestWindow: { type: Number, required: true },
  shortNotes: { type: String, required: true },
});

const Variety = mongoose.model("Variety", varietySchema);
module.exports = { Variety };
