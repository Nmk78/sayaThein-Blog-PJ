const asyncHandler = require("express-async-handler")

// const get_all_users = async (req, res) => {
//       res.status(200).json({
//             message: "all posts",
//       });
// }



const get_one_user = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `user ${id}`,
  });
};

const user_register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
        res.status(400);
        throw new Error("Fill all fields!");
            //     res.status(400).json({
            //       error: "Fill all fields!",
            //     });
            //     return;
  }
  res.status(201).json({
    message: "register successful",
  });
});

const user_login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
      if (!email || !password) {
            res.status(400);
            throw new Error("Fill all fields!");
    
            //   res.status(400).json({
            //     error: "Fill all fields!",
            //   });
            //   return;
      }

  res.status(200).json({
    message: "Login Successful",
  });
});
module.exports = {
  get_one_user,
  user_register,
  user_login,
};
