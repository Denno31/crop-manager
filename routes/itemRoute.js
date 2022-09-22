const { response } = require("express");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Item = require("../models/ItemModel");
const StockAdded = require("../models/StockAdded");
const { isAuth } = require("../utils/utils");

const router = express.Router();

//stocks routes
router.get(
  "/stocks",

  expressAsyncHandler(async function (req, res) {
    const stocksHistory = await StockAdded.find();

    res.send(stocksHistory);
  })
);
router.get(
  "/stocks/group",

  expressAsyncHandler(async function (req, res) {
    const stocksHistory = await StockAdded.aggregate([
      {
        $group: {
          _id: "$item",
          quantity: { $sum: "$quantity" },
        },
      },
    ]);

    res.send(stocksHistory);
  })
);
router.post(
  "/stocks",

  expressAsyncHandler(async function (req, res) {
    const stockAdded = new StockAdded({
      item: req.body.item,
      quantity:
        req.body.additionType === "addition"
          ? Number(req.body.quantity)
          : 0 - Number(req.body.quantity),
      comment: req.body.comment,
      additionType: req.body.additionType,
      addedDate: req.body.addedDate,
    });
    const postedStock = await stockAdded.save();
    res.send(postedStock);
  })
);

router.get(
  "/",

  expressAsyncHandler(async function (req, res) {
    let items = await Item.find();
    const stocksHistory = await StockAdded.aggregate([
      {
        $group: {
          _id: "$item",
          quantity: { $sum: "$quantity" },
        },
      },
    ]);
    items = items.map((item) => {
      let stockItem = stocksHistory.find((x) => {
        return x._id.toString() == item._id.toString();
      });
      //console.log(stockItem);
      if (stockItem) {
        item.quantity = stockItem.quantity;
      }
      return item;
    });
    res.send(items);
  })
);

router.get(
  "/:id",

  expressAsyncHandler(async function (req, res) {
    const items = await Item.findById(req.params.id);
    res.send(items);
  })
);

router.post(
  "/",

  expressAsyncHandler(async function (req, res) {
    const item = new Item({
      itemDesc: req.body.itemDesc,
      units: req.body.units,
      supplierName: req.body.supplierName,
      brand: req.body.brand,
      category: req.body.category,
      cost: req.body.cost,
    });
    const savedItem = await item.save();
    res.send(savedItem);
  })
);

router.put(
  "/:id",

  expressAsyncHandler(async function (req, res) {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.send({ message: "Item not found" });
    }
    item.itemDesc = req.body.itemDesc || item.itemDesc;
    item.units = req.body.units || item.units;
    item.supplierName = req.body.supplierName || item.supplierName;
    item.brand = req.body.brand || item.brand;
    item.category = req.body.category || item.category;
    item.cost = req.body.cost || item.cost;

    const savedItem = await item.save();

    res.send(savedItem);
  })
);
router.delete(
  "/:id",

  expressAsyncHandler(async (req, res) => {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.send({ message: "Item deleted successfully" });
  })
);
module.exports = router;
