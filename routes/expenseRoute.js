const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { ExpenseCategory } = require("../models/ExpenseCategoryModel");
const { isAuth } = require("../utils/utils");

const router = express.Router();
router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const expenseCategory = new ExpenseCategory({
      expenseCategory: req.body.expenseCategory,
    });
    const savedexpenseCategory = await expenseCategory.save();
    res.send({
      message: "expense Category saved",
      expenseCategory: savedexpenseCategory,
    });
  })
);
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const expenseCategories = await ExpenseCategory.find();
    res.send(expenseCategories);
  })
);
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const expenseCategory = await ExpenseCategory.findById(req.params.id);
    if (!expenseCategory)
      return res.send({ message: "expense category not found" });
    res.send(expenseCategory);
  })
);
router.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const expenseCategory = await ExpenseCategory.findById(req.params.id);
    if (!expenseCategory)
      return res.send({ message: "expense category not found" });
    expenseCategory.expenseCategory =
      req.body.expenseCategory || req.body.expenseCategory;
    const savedexpenseCategory = await expenseCategory.save();
    res.send({
      message: "expense category updated",
      expenseCategory: savedexpenseCategory,
    });
  })
);
router.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const expenseCategory = await ExpenseCategory.findById(req.params.id);
    if (!expenseCategory)
      return res.send({ message: "expense category not found" });
    const deletedexpenseCateogry = await expenseCategory.delete();
    res.send({ message: "expense category deleted successfully" });
  })
);
module.exports = router;
