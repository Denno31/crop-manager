const express = require("express");

const expressAsyncHandler = require("express-async-handler");
const { Variety } = require("../models/VarietyModel.js");
const { isAuth } = require("../utils/utils.js");
const router = express.Router();
router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const variety = new Variety({
      name: req.body.name,
      crop: req.body.crop,
      lightProfile: req.body.lightProfile,
      fieldType: req.body.fieldType,
      daysToMaturity: req.body.daysToMaturity,
      harvestWindow: req.body.harvestWindow,
      shortNotes: req.body.shortNotes,
    });
    const createdVariety = await variety.save();
    res.send({ message: "variety created", variety: createdVariety });
  })
);
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const varieties = await Variety.find().populate("crop").exec();
    res.send(varieties);
  })
);
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const variety = await Variety.findOne({ _id: req.params.id })
      .populate("crop")
      .exec();
    if (!variety) return res.send({ message: "Variety not found" });
    res.send(variety);
  })
);
router.get(
  "/crop/:id",
  expressAsyncHandler(async (req, res) => {
    const variety = await Variety.findOne({ crop: req.params.id });
    if (!variety) return res.send({ message: "Variety not found" });
    res.send(variety);
  })
);
router.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const variety = await Variety.findById(req.params.id);
    if (!variety) return res.send({ message: "variety not found" });
    variety.name = req.body.name || variety.name;
    variety.crop = req.body.crop || variety.crop;
    variety.fieldType = req.body.fieldType || variety.fieldType;
    variety.lightProfile = req.body.lightProfile || variety.lightProfile;
    variety.daysToMaturity = req.body.daysToMaturity || variety.daysToMaturity;
    variety.harvestWindow = req.body.harvestWindow || field.harvestWindow;
    variety.shortNotes = req.body.shortNotes || variety.shortNotes;
    const savedVariety = await variety.save();
    res.send({ message: "variety saved", variety: savedVariety });
  })
);
router.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const deletedVariety = await Variety.findByIdAndDelete(req.params.id);
    res.send({ message: "Variety deleted successfully" });
  })
);
module.exports = router;
