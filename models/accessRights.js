const mongoose = require("mongoose");

const accessRightSchema = mongoose.Schema(
  {
    accessRight: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AccessRight = mongoose.model("AccessRight", accessRightSchema);
module.exports = { AccessRight };
