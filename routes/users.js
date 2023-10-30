const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, ValidateUpdateUser } = require("../models/User");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");

// @desc Get All Users
// @route /api/users
// @method Get
// @access private (only Admin)

router.get(
  "/",
  verifyTokenAndAdmin,
  asynchandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  })
);

// @desc Get user by id
// @route /api/users/:id
// @method Get
// @access private (only Admin & user himself)

router.get(
  "/:id",
  verifyTokenAndAuthorization,
  asynchandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  })
);

// @desc delete user
// @route /api/users/:id
// @method Delete
// @access private (only Admin & user himself)

router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  asynchandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id).select(
      "-password"
    );
    if (user) {
      res.status(200).json({ message: "user has been deleted successfuly" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  })
);

// @desc Update  user
// @route /api/:id
// @method put
// @access private

router.put(
  "/:id",
  verifyTokenAndAuthorization,
  asynchandler(async (req, res) => {
    //verifyTokenAndAuthorization
    const { error } = ValidateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  })
);

module.exports = router;
