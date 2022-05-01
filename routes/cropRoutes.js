const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { Crop } = require("../models/CropModel.js");
const { isAuth } = require("../utils/utils.js");

const router = express.Router();

router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // cropName: { type: String, required: true },
    // harvestUnit: { type: String, required: true },
    // shortNotes: { type: String, required: true },
    // varieties: { type: Number, default: 0 },
    // plantings: { type: Number, default: 0 },
    // createdBy: { type: mongoose.Schema.Types.ObjectId },
    const crop = new Crop({
      cropName: req.body.cropName,
      harvestUnit: req.body.harvestUnit,
      shortNotes: req.body.shortNotes,
      varieties: req.body.varieties,
      plantings: req.body.plantings,
      createdBy: req.user,
    });
    const createdCrop = await crop.save();
    res.send({ crop: createdCrop, message: "Crop created" });
  })
);
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const crops = await Crop.find();
    res.send(crops);
  })
);
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.send({ message: "Crop not found" });
    res.send(crop);
  })
);
router.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.send({ message: "crop not found" });
    crop.cropName = req.body.cropName || crop.cropName;
    crop.harvestUnit = req.body.harvestUnit || crop.harvestUnit;
    crop.shortNotes = req.body.shortNotes || crop.shortNotes;
    crop.varieties = req.body.varieties || crop.varieties;
    crop.plantings = req.body.plantings || crop.plantings;

    const updatedCrop = await crop.save();
    res.send({ message: "crop updated", crop: updatedCrop });
  })
);
router.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const deletedCrop = await Crop.findByIdAndDelete(req.params.id);
    res.send({ message: "Delete successfull" });
  })
);
module.exports = router;
