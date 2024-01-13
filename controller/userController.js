const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const { isValidObjectId, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = async (_id) => {
  console.log("run");
  console.log("Secret-", process.env.JWT_SECRECT);
  return jwt.sign({ _id }, process.env.JWT_SECRECT, { expiresIn: "7d" });
};

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

*/
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

const user_login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.json({ error: "Fill all fields" });
    return;
  }

  try {
    const loginnedUser = await User.findOne({ email: email }).select(
      "_id name email password code profileImg"
    );
    if (!loginnedUser) {
      res.status(400);
      res.json({ error: "user not found" });
    }

    console.log(loginnedUser);
    const passwordMatch = await bcrypt.compare(password, loginnedUser.password);

    if (!passwordMatch) {
      res.status(400);
      res.json({ error: "Invalid Password" });
    }

    console.log(loginnedUser);

    const token = await createToken(loginnedUser.email);
    console.log(token);
    res.status(200);
    res.json({
      _id: loginnedUser._id,
      name: loginnedUser.name,
      email: loginnedUser.email,
      profileImg: loginnedUser.profileImg,
      refferalCode: loginnedUser.code,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: error.message });
  }
};

const profileImgChange = async (req, res) => {
  const {id, profileImg} = req.body;
  const _id = new mongoose.Types.ObjectId(id);


  try {
    const user = await User.findById({_id})
    if(!user){
      return res.status(500).json({error: "User not found"})
    }
    updatedUser = await User.findByIdAndUpdate({_id},{profileImg}, {new: true})
    if(!updatedUser){
      return res.status(500).json({error: "Updated Failed"})
    }
    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error);
    return res.status(500).json(({error: error.message}))
  }

};

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
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const get_all_posts_by_author = async (req, res) => {
  try {
    const { author } = req.body;
    if (!author) {
      res.status(400).json({ message: "Author is required" });
    }
    let posts = await Post.find({ "author.id": author.id });
    let user = await User.find({ _id: author.id }).select("_id email profileImg name");
    console.log("posts=>", posts);

    res.status(200).json({ posts: posts, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  get_one_user,
  get_all_posts_by_author,
  // user_register,
  user_login,
  profileImgChange
};

