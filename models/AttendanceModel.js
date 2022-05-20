const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    eid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    yearMonth: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
