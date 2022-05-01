const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { User } = require("../models/useModel.js");
const bcrypt = require("bcryptjs");
const { generateToken, isAuth } = require("../utils/utils.js");
const data = require("../data.js");
const router = express.Router();

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send(createdUsers);
  })
);

router.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password))
        return res.send({
          _id: user._id,
          name: user.name,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
router.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find();
    res.send(users);
  })
);
router.get(
  "/:id/edit",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  })
);
router.post(
  "/register",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
router.put(
  "/:id/update",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id);
    console.log(user);
    user.email = req.body.email || user.email;
    user.password = req.body.password
      ? bcrypt.hashSync(req.body.password, 8)
      : user.password;
    user.name = req.body.name;
    user.isAdmin = req.body.isAdmin;

    const savedUser = await user.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
router.delete(
  "/:id/delete",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const deleteUser = await user.delete();
    res.send({ message: "User Deleted Successfully" });
  })
);

module.exports = router;
