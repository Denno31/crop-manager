const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Attendance = require("../models/AttendanceModel");
const Transaction = require("../models/Transactions");
const { isAuth, getMonthCustom } = require("../utils/utils");

const router = express.Router();

router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attendance = new Attendance({
      eid: req.body.eid,
      month: req.body.month,
      yearMonth: getMonthCustom(req.body.month),
    });
    const savedAttendance = await attendance.save();
    res.send(savedAttendance);
  })
);
router.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attendances = await Attendance.find().populate("eid");

    res.send(attendances);
  })
);
router.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attendance = await Attendance.findById(req.params.id).populate("eid");

    res.send(attendance);
  })
);
router.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance)
      return res.status(404).send({ message: "Attendance not found" });
    attendance.eid = req.body.eid || attendance.eid;
    attendance.month = req.body.month || attendance.month;
    attendance.yearMonth = getMonthCustom(req.body.month || attendance.month);
    const savedAttendance = await attendance.save();
    res.send({ message: "updated successfully" });
  })
);
router.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance)
      return res.status(404).send({ message: "Attendance not found" });
    const deletedAttendance = attendance.delete();
    res.send({ message: "Deleted Successfully" });
  })
);
module.exports = router;
