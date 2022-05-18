const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Employee = require("../models/Employee");
const { isAuth } = require("../utils/utils");

const router = express.Router();

router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const employee = new Employee({
      name: req.body.name,
      employeeNo: req.body.employeeNo,
      phone: req.body.phone,
      address: req.body.address,
      designation: req.body.designation,
      salary: req.body.salary,
      joinDate: req.body.joinDate,
    });
    const savedEmployee = await employee.save();
    res.send({ employee: savedEmployee, message: "Employee saved" });
  })
);
router.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const employees = await Employee.find();
    res.send(employees);
  })
);
router.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.send(employee);
  })
);
router.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    employee.name = req.body.name || employee.name;
    employee.employeeNo = req.body.employeeNo || employee.employeeNo;
    employee.phone = req.body.phone || employee.phone;
    employee.address = req.body.address || employee.address;
    employee.designation = req.body.designation || employee.designation;
    employee.salary = req.body.salary || employee.salary;
    employee.joinDate = req.body.joinDate || employee.joinDate;
    const savedEmployee = await employee.save();
    res.send(savedEmployee);
  })
);
router.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    employee.delete();
    res.send({ message: "Employee deleted successfully" });
  })
);
module.exports = router;
