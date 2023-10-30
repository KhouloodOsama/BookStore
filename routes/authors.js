const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const { Author ,validateCreatelastName,validateUpdatelastName} = require("../models/Author");
const {verifyTokenAndAdmin} = require("../middleware/verifyToken")
//Http Methods

// @desc Get all lastNames
// @route /api/lastNames
// @method Get
// @access public

router.get("/", asynchandler(async (req, res) => {
        const authorList = await Author.find();
        res.status(200).json(authorList);
})
);

// @desc Get lastName by id
// @route /api/lastName/id
// @method Get
// @access public

router.get("/:id",asynchandler(async(req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "author not found" });
    }
  
}));

// @desc create new author
// @route /api/authors
// @method Post
// @access private (only admin)

router.post("/",verifyTokenAndAdmin,asynchandler(async (req, res) => {
  const { error } = validateCreatelastName(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await author.save();
    res.status(201).json(result);
 } // 201 created successfuly
 ));

// @desc update new author
// @route /api/authors/:id
// @method Put
// @access private (only admin)

router.put("/:id",verifyTokenAndAdmin,asynchandler(async(req, res) => {
  const { error } = validateUpdatelastName(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
    const author = await Author.findByIdAndUpdate(req.params.id , {
        $set:{
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          image: req.body.image,
        }
      },{
        new:true
      });
      res.status(200).json(author);
 
}));

// @desc delete author
// @route /api/authors/:id
// @method delete
// @access private

router.delete("/:id",verifyTokenAndAdmin,asynchandler(async(req, res) => {

    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "author has been deleted" });
    } else {
      res.status(404).json({ message: "author not found" });
    }
 
}));


module.exports = router;
