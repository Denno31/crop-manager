const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { Expense } = require("../models/ExpenseModel");
const { isAuth } = require("../utils/utils");

const router = express.Router();

router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const expense = new Expense({
      field: req.body.field,
      category: req.body.category,
      expenseAmount: req.body.expenseAmount,
      expenseDate: new Date(req.body.expenseDate),
      receiptNo: req.body.receiptNo,
      customerName: req.body.customerName,
      shortNotes: req.body.shortNotes,
    });
    const savedexpense = await expense.save();
    res.send({ message: "expense saved", expense: savedexpense });
  })
);
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const expenses = await Expense.find()
      .populate("field")
      .populate("category")
      .exec();
    res.send(expenses);
  })
);
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id)
      .populate("field")
      .populate("category")
      .exec();
    res.send(expense);
  })
);
router.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.send({ message: "expense not found" });
    expense.field = req.body.field || expense.field;
    expense.category = req.body.category || expense.category;
    expense.expenseAmount = req.body.expenseAmount || expense.expenseAmount;
    expense.expenseDate = req.body.expenseDate
      ? new Date(req.body.expenseDate)
      : expense.expenseDate;
    expense.receiptNo = req.body.receiptNo || expense.receiptNo;
    expense.customerName = req.body.customerName || expense.customerName;
    expense.shortNotes = req.body.shortNotes || expense.shortNotes;

    const updatedexpense = await expense.save();
    res.send({ messge: "expense updated", expense: updatedexpense });
  })
);
router.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.send({ message: "expense not found" });
    const deletedexpense = await expense.delete();
    res.send({ message: "expense deleted successfully" });
  })
);
module.exports = router;
