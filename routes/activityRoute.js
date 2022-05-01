const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { Harvest } = require("../models/HarvestModel.js");
const { Planting } = require("../models/PlantingsModel.js");
const { Treatment } = require("../models/TreatmentModel.js");
const { Task } = require("../models/Task");
const { isAuth } = require("../utils/utils.js");
const router = express.Router();

// create planting
router.post(
  "/planting",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const planting = new Planting({
      plantingDate: new Date(req.body.plantingDate),
      activityType: req.body.activityType,
      crop: req.body.crop,
      field: req.body.field,
      fHarvestDate: new Date(req.body.fHarvestDate),
      qtyPlanted: req.body.qtyPlanted,
      estimatedYield: req.body.estimatedYield,
      distanceBetweenPlants: req.body.distanceBetweenPlants,
      seedCompany: req.body.seedCompany,
      seedLotNumber: req.body.seedLotNumber,
      seedOrigin: req.body.seedOrigin,
      shortNotes: req.body.shortNotes,
      createdBy: req.user,
      status: req.body.status,
    });
    const createdPlanting = await planting.save();
    res.send({ message: "Planting created", planting: createdPlanting });
  })
);
router.get(
  "/planting",
  expressAsyncHandler(async (req, res) => {
    const plantings = await Planting.find()
      .populate("crop")
      .populate("field")
      .exec();
    res.send(plantings);
  })
);
router.get(
  "/planting/:id",
  expressAsyncHandler(async (req, res) => {
    const planting = await Planting.findById(req.params.id);
    if (!planting) res.send({ message: "No planting was found" });
    res.send(planting);
  })
);
router.put(
  "/planting/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const planting = await Planting.findById(req.params.id);
    if (!planting)
      return res.status(404).send({ message: "Planting was not found" });
    planting.activityType = req.body.activityType || planting.activityType;
    planting.plantingDate = req.body.plantingDate
      ? new Date(req.body.plantingDate)
      : planting.plantingDate;

    planting.crop = req.body.crop || planting.crop;
    planting.field = req.body.field || planting.field;
    planting.fHarvestDate = req.body.fHarvestDate
      ? new Date(req.body.fHarvestDate)
      : planting.fHarvestDate;
    planting.qtyPlanted = req.body.qtyPlanted || planting.qtyPlanted;
    planting.estimatedYield =
      req.body.estimatedYield || planting.estimatedYield;
    planting.distanceBetweenPlants =
      req.body.distanceBetweenPlants || planting.distanceBetweenPlants;
    planting.seedCompany = req.body.seedCompany || planting.seedCompany;
    planting.seedLotNumber = req.body.seedLotNumber || planting.seedLotNumber;
    planting.seedOrigin = req.body.seedOrigin || planting.seedOrigin;
    planting.shortNotes = req.body.shortNotes || planting.shortNotes;
    planting.status = req.body.status || planting.status;

    const updatedPlanting = await planting.save();
    res.send({ message: "Planting updated", planting: updatedPlanting });
  })
);
router.delete(
  "/planting/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const planting = await Planting.findById(req.params.id);
    if (!planting)
      return res.status(404).send({ message: "Planting was not found" });
    const deletedPlanting = await planting.delete();
    res.send({ message: "Planting was deleted successfully" });
  })
);

//-----------------------harvest routes ------------------------------------>
router.post(
  "/harvest",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const harvest = new Harvest({
      harvestDate: new Date(req.body.harvestDate),
      plantingToHarvest: req.body.plantingToHarvest,
      qtyHarvested: req.body.qtyHarvested,
      batch: req.body.batch,
      harvestQuality: req.body.harvestQuality,
      isFinalHarvest: req.body.isFinalHarvest,
      quantityRejected: req.body.quantityRejected,
      unitCost: req.body.unitCost,
      income: req.body.income,
      shortNotes: req.body.shortNotes,
    });
    const savedHarvest = await harvest.save();
    res.send({ message: "Harvest saved successfully", harvest: savedHarvest });
  })
);
router.get(
  "/harvest",
  expressAsyncHandler(async (req, res) => {
    const harvests = await Harvest.find()
      .populate({
        path: "plantingToHarvest",
        populate: {
          path: "crop",
        },
      })
      .populate({
        path: "plantingToHarvest",
        populate: {
          path: "field",
        },
      })
      .exec();
    res.send(harvests);
  })
);
router.get(
  "/harvest/:id",
  expressAsyncHandler(async (req, res) => {
    const harvest = await Harvest.findById(req.params.id);
    if (!harvest)
      return res.status(404).send({ message: "Harvest was not found" });
    res.send(harvest);
  })
);
router.put(
  "/harvest/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const harvest = await Harvest.findById(req.params.id);
    if (!harvest) return res.send({ message: "Harvest was not found" });
    harvest.harvestDate = req.body.harvestDate
      ? new Date(req.body.harvestDate)
      : harvet.harvestDate;
    harvest.plantingToHarvest =
      req.body.plantingToHarvest || harvest.plantingToHarvest;
    harvest.qtyHarvested = req.body.qtyHarvested || harvest.qtyHarvested;
    harvest.batch = req.body.batch || harvest.batch;
    harvest.harvestQuality = req.body.harvestQuality || harvest.harvestQuality;
    harvest.isFinalHarvest = req.body.isFinalHarvest;
    harvest.quantityRejected =
      req.body.quantityRejected || harvest.quantityRejected;
    harvest.unitCost = req.body.unitCost || harvest.unitCost;
    harvest.income = req.body.income || harvest.income;
    harvest.shortNotes = req.body.shortNotes || harvest.shortNotes;

    const savedHarvest = await harvest.save();
    res.send({
      message: "Harvest was saved successfully",
      harvest: savedHarvest,
    });
  })
);
router.delete(
  "/harvest/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    const harvest = await Harvest.findById(req.params.id);
    if (!harvest) return res.send({ message: "Harvest was not found" });
    const deletedHarvest = await harvest.delete();
    res.send({ message: "Harvest was deleted successfully" });
  })
);
// ------------------------Treatement------------------------------------------->
router.post(
  "/treatment",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const treatment = new Treatment({
      treatmentDate: new Date(req.body.treatmentDate),
      treatmentType: req.body.treatmentType,
      status: req.body.status,
      field: req.body.field,
      planting: req.body.planting,
      productUsed: req.body.productUsed,
      quantityOfProduct: req.body.quantityOfProduct,
      shortNotes: req.body.shortNotes,
    });
    const savedTreatment = await treatment.save();
    res.send({ message: "Treatment saved", treatment: savedTreatment });
  })
);
router.get(
  "/treatment",
  expressAsyncHandler(async (req, res) => {
    const treatments = await Treatment.find().populate("field");
    res.send(treatments);
  })
);
router.get(
  "/treatment/:id",
  expressAsyncHandler(async (req, res) => {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) return res.send({ message: "Treatment not found" });
    res.send(treatment);
  })
);
router.put(
  "/treatment/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) return res.send({ message: "Treatment not found" });
    treatment.treatmentDate = req.body.treatmentDate
      ? new Date(req.body.treatmentDate)
      : treatment.treatmentDate;
    treatment.treatmentType = req.body.treatmentType || treatment.treatmentType;
    treatment.status = req.body.status || treatment.status;
    treatment.field = req.body.field || treatment.field;
    treatment.planting = req.body.planting || treatment.planting;
    treatment.productUsed = req.body.productUsed;
    treatment.quantityOfProduct =
      req.body.quantityOfProduct || treatment.quantityOfProduct;
    treatment.shortNotes = req.body.shortNotes || treatment.shortNotes;
    const updatedTreatment = await treatment.save();
    res.send({ message: "Treatment updated", treatment: updatedTreatment });
  })
);
router.delete(
  "/treatment/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) return res.send({ message: "Treatment not found" });
    const deletedTreatment = await treatment.delete();
    res.send({ message: "Treatment deleted" });
  })
);
//--------------------------------Task---------------------->>>
router.post(
  "/task",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const task = new Task({
      taskDate: new Date(req.body.taskDate),
      status: req.body.status,
      taskName: req.body.taskName,
      planting: req.body.planting,
      field: req.body.field,
      shortNotes: req.body.shortNotes,
    });
    const savedTask = await task.save();
    res.send({ message: "Task saved successfully", task: savedTask });
  })
);
router.get(
  "/task",
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find().populate("field");
    res.send(tasks);
  })
);
router.get(
  "/task/:id",
  expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.send({ message: "Task not found" });
    res.send(task);
  })
);
router.put(
  "/task/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.send({ message: "Task not found" });
    task.taskDate = req.body.taskDate
      ? new Date(req.body.taskDate)
      : task.taskDate;
    task.status = req.body.status || task.status;
    task.taskName = req.body.taskName || task.taskName;
    task.planting = req.body.planting || task.planting;
    task.field = req.body.field || task.field;
    task.shortNotes = req.body.shortNotes || task.shortNotes;
    const updatedTask = await task.save();
    res.send({ message: "Task updated successfully", task: updatedTask });
  })
);
router.delete(
  "/task/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.send({ message: "Task not found" });
    const deletedTask = await task.delete();
    res.send({ message: "Task Deleted successfully" });
  })
);
module.exports = router;
