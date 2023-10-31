const mongoose = require("mongoose");
const joi = require("joi");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 250,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author",
    },
   description:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    price:{
        type:Number,
        require:true,
        min:0,
    },
    cover:{
       type:String,
       require:true,
       enum:["soft cover","hard cover"],
    }

},{
    timestamps: true
})
// validate create book
function validateCreateBook(obj) {
    const schema = joi.object({
      title: joi.string().trim().min(3).max(250).required(),
      author: joi.string().required(),
      description: joi.string().trim().min(5).required(),
      price: joi.number().min(0).required(),
      cover: joi.string().valid("soft cover","hard cover").required(),
    });
    return schema.validate(obj);
  }
  // validate update book
  function validateUpdateBook(obj) {
    const schema = joi.object({
      title: joi.string().trim().min(3).max(250),
      author: joi.string(),
      description: joi.string().trim().min(5),
      price: joi.number().min(0),
      cover: joi.string().valid("soft cover","hard cover"),
    });
    return schema.validate(obj);
  }
const Book = mongoose.model("Book", BookSchema);
module.exports = {
    Book,
    validateCreateBook,
    validateUpdateBook,
}
