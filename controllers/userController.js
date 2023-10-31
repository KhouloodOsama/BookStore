const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");

/**
 *  @desc    Update User
 *  @route   /api/users/:id
 *  @method  PUT
 *  @access  private (only admin & user himself)
 */
module.exports.updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
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
});

/**
 *  @desc    Get All Users
 *  @route   /api/users
 *  @method  GET
 *  @access  private (only admin)
 */
module.exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**
 *  @desc    Get User By Id
 *  @route   /api/users/:id
 *  @method  GET
 *  @access  private (only admin & user himself)
 */
module.exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

/**
 *  @desc    Delete User
 *  @route   /api/users/:id
 *  @method  DELETE
 *  @access  private (only admin & user himself)
 */
module.exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user has been deleted successfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

// const asynchandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");
// const { User, ValidateUpdateUser } = require("../models/User");

// // @desc Get All Users
// // @route /api/users
// // @method Get
// // @access private (only Admin)

// module.exports.getAllUser = asynchandler(async (req, res) => {
//   const users = await User.find().select("-password");
//   res.status(200).json(users);
// })

// // @desc Get user by id
// // @route /api/users/:id
// // @method Get
// // @access private (only Admin & user himself)

// module.exports.getUserById = asynchandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password");
//   if (user) {
//     res.status(200).json(user);
//   } else {
//     res.status(404).json({ message: "user not found" });
//   }
// })

// // @desc delete user
// // @route /api/users/:id
// // @method Delete
// // @access private (only Admin & user himself)

// module.exports.deleteUser = asynchandler(async (req, res) => {
//     const user = await User.findByIdAndDelete(req.params.id).select(
//       "-password"
//     );
//     if (user) {
//       res.status(200).json({ message: "user has been deleted successfuly" });
//     } else {
//       res.status(404).json({ message: "user not found" });
//     }
//   })


// // @desc Update  user
// // @route /api/:id
// // @method put
// // @access private

// module.exports.updateUser = asynchandler(async (req, res) => {
//     //verifyTokenAndAuthorization
//     const { error } = ValidateUpdateUser(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           email: req.body.email,
//           password: req.body.password,
//           username: req.body.username,
//         },
//       },
//       { new: true }
//     ).select("-password");
//     res.status(200).json(updatedUser);
//   })

