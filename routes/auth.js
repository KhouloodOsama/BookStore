const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const {
  User,
  ValidateLoginUser,
  ValidateRegisterUser,
} = require("../models/User");

// @desc Register new user
// @route /api/register
// @method Post
// @access public

router.post(
  "/register",
  asynchandler(async (req, res) => {
    const { error } = ValidateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "this user already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
     
    });
    const result = await user.save();
    const token = user. generateToken();   
    
    const{password, ...other} = result._doc;
    res.status(201).json(...other,token);
  })
);
// @desc Login user
// @route /api/Login
// @method Post
// @access public

router.post(
  "/login",
  asynchandler(async(req, res) => {
    const { error } = ValidateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password"});
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const token = user.generateToken();
    //res.status(200).json({token:token , user:user});
     const{email,role} = user;
     res.status(200).json({token:token , user:{email:email , role:role}})
  })
);

module.exports = router;
