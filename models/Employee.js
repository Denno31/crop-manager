const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    employeeNo: {
      type: Number,
      unique: true,
    },
    salary: { type: Number, required: true },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    designation: {
      type: String,
      required: true,
    },
    joinDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
