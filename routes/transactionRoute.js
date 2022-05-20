const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Attendance = require("../models/AttendanceModel");
const Transaction = require("../models/Transactions");
const { isAuth, getMonthCustom } = require("../utils/utils");

const router = express.Router();

router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attendance = await Attendance.findOne({
      eid: mongoose.Types.ObjectId(req.body.employeeId),
      yearMonth: getMonthCustom(req.body.month),
    });

    //check if attendance month exists

    if (!attendance) {
      console.log("attendance not found");
      return res
        .status(404)
        .send({ message: "The attendance month for this user does not exist" });
    }
    const transaction = new Transaction({
      transactionId: req.body.transactionId,
      employeeId: req.body.employeeId,
      amount: req.body.amount,
      month: req.body.month,
      paymentDate: req.body.paymentDate,
      yearMonth: getMonthCustom(req.body.month),
    });
    const savedTransaction = await transaction.save();

    //aggregate transactions

    const transactionAggregate = await Transaction.find({
      employeeId: req.body.employeeId,
      yearMonth: getMonthCustom(req.body.month),
    });
    let pAmount = 0;

    for (let i = 0; i < transactionAggregate.length; i++) {
      console.log(transactionAggregate[i].amount);
      pAmount += transactionAggregate[i].amount;
    }

    attendance.paidAmount = pAmount;
    await attendance.save();

    res.send({ transaction: savedTransaction, message: "Transaction saved" });
  })
);
router.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const transactions = await Transaction.find().populate("employeeId");
    res.send(transactions);
  })
);
router.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    res.send(transaction);
  })
);
router.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attendance = await Attendance.findOne({
      eid: mongoose.Types.ObjectId(req.body.employeeId),
      yearMonth: getMonthCustom(req.body.month),
    });

    //check if attendance month exists

    if (!attendance) {
      console.log("attendance not found");
      return res
        .status(404)
        .send({ message: "The attendance month for this user does not exist" });
    }

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction)
      return res.status(404).send({ message: "transaction not found" });
    transaction.transactionId =
      req.body.transactionId || transaction.transactionId;
    transaction.employeeId = req.body.employeeId || transaction.employeeId;
    transaction.amount = req.body.amount || transaction.amount;
    transaction.month = req.body.month || transaction.month;
    transaction.paymentDate = req.body.paymentDate || transaction.paymentDate;
    transaction.yearMonth = req.body.month
      ? getMonthCustom(req.body.month)
      : transaction.yearMonth;
    const savedTransaction = await transaction.save();
    //aggregate transactions

    const transactionAggregate = await Transaction.find({
      employeeId: req.body.employeeId,
      yearMonth: getMonthCustom(req.body.month),
    });
    let pAmount = 0;

    for (let i = 0; i < transactionAggregate.length; i++) {
      console.log(transactionAggregate[i].amount);
      pAmount += transactionAggregate[i].amount;
    }
    console.log(pAmount);

    attendance.paidAmount = pAmount;
    await attendance.save();

    res.send({ message: "Transaction saved" });
  })
);
router.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    transaction.delete();
    res.send({ message: "Transaction deleted" });
  })
);
module.exports = router;
