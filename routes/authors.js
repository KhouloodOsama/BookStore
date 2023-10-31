const express = require("express");
const router = express.Router(); 
const {verifyTokenAndAdmin} = require("../middleware/verifyToken")
const {getAllAuthors ,
    getAuthorById ,
    createNewAuthor,
    updateNewAuthor,
    deleteAuthor
  } = require("../controllers/authorsController");
//Http Methods


// api/author
router.route("/")
      .get(getAllAuthors)
      .post(verifyTokenAndAdmin,createNewAuthor);

// api/author/id
router.route("/:id")
      .get(getAuthorById)
      .put(verifyTokenAndAdmin,updateNewAuthor)
      .delete(verifyTokenAndAdmin,deleteAuthor)


module.exports = router;
