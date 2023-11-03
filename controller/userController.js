const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const { isValidObjectId } = require("mongoose");

// const get_all_users = async (req, res) => {
//       res.status(200).json({
//             message: "all posts",
//       });
// }

////these logics are done by next auth in front-end//

/*
    // const user_register = asyncHandler(async (req, res) => {
    //   const { email, password } = req.body;
    //   if (!email || !password) {
    //         res.status(400);
    //         throw new Error("Fill all fields!");
    //   }
    //   res.status(201).json({
    //     message: "register successful",
    //   });
    // });

    // const user_login = asyncHandler(async (req, res) => {
    //   const { email, password } = req.body;
    //       if (!email || !password) {
    //             res.status(400);
    //             throw new Error("Fill all fields!");
    //       }

    //   res.status(200).json({
    //     message: "Login Successful",
    //   });
    // });
 */

const get_one_user = async (req, res) => {
  const { id } = req.params;
  
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Removing circular references
    const userWithoutCircularReferences = { ...user._doc };
    delete userWithoutCircularReferences.client; // Assuming 'client' is the circular reference causing the issue

    return res.status(200).json({ user: userWithoutCircularReferences });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  get_one_user,
  // user_register,
  // user_login,
};
