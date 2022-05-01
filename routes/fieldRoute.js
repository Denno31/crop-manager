const express = require("express");

const expressAsyncHandler = require("express-async-handler");
const { Field } = require("../models/FieldModel.js");
const { isAuth } = require("../utils/utils.js");
const router = express.Router();
router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const field = new Field({
      name: req.body.name,
      fieldType: req.body.fieldType,
      lightProfile: req.body.lightProfile,
      fieldStatus: req.body.fieldStatus,
      fieldSize: req.body.fieldSize,
      shortNotes: req.body.shortNotes,
      createdBy: req.user,
    });
    const createdField = await field.save();
    res.send({ message: "Field created", field: createdField });
  })
);
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const fields = await Field.find();
    res.send(fields);
  })
);
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const field = await Field.findOne({ _id: req.params.id });
    if (!field) return res.send({ message: "field not found" });
    res.send(field);
  })
);
router.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const field = await Field.findById(req.params.id);
    if (!field) return res.send({ message: "field not found" });
    field.name = req.body.name || field.name;
    field.fieldType = req.body.fieldType || field.fieldType;
    field.lightProfile = req.body.lightProfile || field.lightProfile;
    field.fieldStatus = req.body.fieldStatus || field.fieldStatus;
    field.fieldSize = req.body.fieldSize || field.fieldSize;
    field.shortNotes = req.body.shortNotes || field.shortNotes;
    const savedField = await field.save();
    res.send({ message: "field saved", field: savedField });
  })
);
router.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const deletedField = await Field.findByIdAndDelete(req.params.id);
    res.send({ message: "Field deleted successfully" });
  })
);
module.exports = router;
