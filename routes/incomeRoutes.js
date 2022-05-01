const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { IncomeCategory } = require("../models/IncomeCategoryModel");
const { isAuth } = require("../utils/utils");

const router = express.Router();
router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const incomeCategory = new IncomeCategory({
      incomeCategory: req.body.incomeCategory,
    });
    const savedIncomeCategory = await incomeCategory.save();
    res.send({
      message: "Income Category saved",
      incomeCategory: savedIncomeCategory,
    });
  })
);
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const incomeCategories = await IncomeCategory.find();
    res.send(incomeCategories);
  })
);
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const incomeCategory = await IncomeCategory.findById(req.params.id);
    if (!incomeCategory)
      return res.send({ message: "Income category not found" });
    res.send(incomeCategory);
  })
);
router.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const incomeCategory = await IncomeCategory.findById(req.params.id);
    if (!incomeCategory)
      return res.send({ message: "Income category not found" });
    incomeCategory.incomeCategory =
      req.body.IncomeCategory || req.body.incomeCategory;
    const savedIncomeCategory = await incomeCategory.save();
    res.send({
      message: "Income category updated",
      incomeCategory: savedIncomeCategory,
    });
  })
);
router.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const incomeCategory = await IncomeCategory.findById(req.params.id);
    if (!incomeCategory)
      return res.send({ message: "Income category not found" });
    const deletedIncomeCateogry = await incomeCategory.delete();
    res.send({ message: "Income category deleted successfully" });
  })
);

module.exports = router;
