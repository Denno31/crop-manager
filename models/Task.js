const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskDate: { type: Date, required: true },
    status: { type: String, required: true },
    taskName: { type: String, required: true },
    planting: { type: mongoose.Schema.Types.ObjectId, ref: "Planting" },
    field: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
    shortNotes: { type: String },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
