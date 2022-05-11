const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Transaction = require("../models/Transactions");
const { isAuth } = require("../utils/utils");

const router = express.Router();

router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const transaction = new Transaction({
      transactionId: req.body.transactionId,
      employeeId: req.body.employeeId,
      amount: req.body.amount,
      month: req.body.month,
    });
    const savedTransaction = await transaction.save();
    res.send({ transaction: savedTransaction, message: "Transaction saved" });
  })
);
router.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const transactions = await Transaction.find();
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
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).send({ message: "transaction not found" });
    transaction.transactionId =
      req.body.transactionId || transaction.transactionId;
    transaction.employeeId = req.body.employeeId || transaction.employeeId;
    transaction.amount = req.body.amount || transaction.amount;
    transaction.month = req.body.month || transaction.month;
    const savedTransaction = await transaction.save();
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
