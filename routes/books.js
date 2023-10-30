
const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const {validateCreateBook,validateUpdateBook ,Book} = require("../models/Book")
const{verifyTokenAndAdmin} = require("../middleware/verifyToken")

//Http Methods

// @desc Get all Books
// @route /api/Book
// @method Get
// @access public

router.get("/", asynchandler(async(req, res) => {
    const books = await Book.find().populate("author",[
      "_id",
      "firstName",
      "lastName"
    ]);
    res.status(200).json(books);
  }));

// @desc Get book by id
// @route /api/book/id
// @method Get
// @access public

router.get("/:id", asynchandler(async(req, res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  }));

// @desc create new book
// @route /api/Book
// @method Post
// @access private (only admin)

router.post("/",verifyTokenAndAdmin,asynchandler(async(req,res)=>{
  const {error} = validateCreateBook(req.body);
  if(error){
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = new Book ({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover
  })
  const result = await book.save();
  res.status(201).json(result);
}));

// @desc update a book
// @route /api/Book/:id
// @method Put
// @access private (only admin)

router.put("/:id",verifyTokenAndAdmin ,asynchandler(async(req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const updatedBook = await Book.findByIdAndUpdate(req.params.id ,{
    $set:{
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover
    }},{
      new:true
    })
    res.status(200).json(updatedBook);
  }
  ))
  ;

// @desc delete a book
// @route /api/Book/:id
// @method delete
// @access private(only admin)

router.delete("/:id",verifyTokenAndAdmin,asynchandler(async(req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "book has been deleted"});
  } else {
    res.status(404).json({message: "book not found"});
  }
}));


module.exports = router;
