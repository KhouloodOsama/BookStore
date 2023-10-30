const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    username:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength:6,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }

},{
    timestamps: true
})

//Generate Token
UserSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id ,isAdmin: this.isAdmin} , process.env.JWT_SECRET_KEY);
}

// User Model
const User = mongoose.model("User", UserSchema);

// Validate Register User
function ValidateRegisterUser(obj) {
    const Schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        username: joi.string().trim().min(2).max(200).required(),
        password: joi.string().trim().min(6).required(),
 
    })
    return Schema.validate(obj);
}
// Validate Login User
function ValidateLoginUser(obj) {
    const Schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(6).required(),
    })
    return Schema.validate(obj);
}
// Validate Update User
function ValidateUpdateUser(obj) {
    const Schema = joi.object({
        email: joi.string().trim().min(5).max(100).email(),
        username: joi.string().trim().min(2).max(200),
        password: joi.string().trim().min(6),
    
    })
    return Schema.validate(obj);
}

module.exports = {
   User,
   ValidateUpdateUser,
   ValidateLoginUser,
   ValidateRegisterUser,
}