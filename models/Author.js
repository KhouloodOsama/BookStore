const mongoose = require("mongoose");
const joi = require("joi");
const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
    },
    nationality:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    Image:{
        type: String,
        default: "default-avatar.png",
    }

},{
    timestamps: true
})
// validate create lastName
function validateCreatelastName(obj) {
    const schema = joi.object({
      firstName: joi.string().trim().min(3).max(200).required(),
      lastName: joi.string().trim().min(3).max(200).required(),
      nationality: joi.string().trim().min(2).max(100).required(),
      image: joi.string().trim(),
    });
    return schema.validate(obj);
  }
  // validate update lastName
  function validateUpdatelastName(obj) {
    const schema = joi.object({
      firstName: joi.string().trim().min(3).max(200),
      lastName: joi.string().trim().min(3).max(200),
      nationality: joi.string().trim().min(2).max(100),
      image: joi.string().trim(),
    });
    return schema.validate(obj);
  }

const Author = mongoose.model("Author", AuthorSchema);
module.exports = {
    Author,
    validateCreatelastName,
    validateUpdatelastName
}