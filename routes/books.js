
const express = require("express");
const router = express.Router();
const{verifyTokenAndAdmin} = require("../middleware/verifyToken")
const {getAllBooks ,
      getBookById ,
      createNewBook,
      updateBook,
      deleteBook} = require("../controllers/bookController");
//Http Methods

//api/book
router.route("/")
      .get(getAllBooks)
      .post(verifyTokenAndAdmin,createNewBook)

//api/Books/id
router.route("/:id")
      .get(getBookById)
      .put(verifyTokenAndAdmin,updateBook)
      .delete(verifyTokenAndAdmin ,deleteBook)


module.exports = router;
