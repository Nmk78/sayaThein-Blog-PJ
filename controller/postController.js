const { default: mongoose, isValidObjectId } = require("mongoose");
const Post = require("../models/postModel");

const create_a_post = async (req, res) => {
  const { title, author, content, tags } = req.body;

  const post = await Post.create({
    title,
    content,
    author,
    tags,
  });
  console.log("post", post);

  res.status(201).json({
    post,
  });
};

const get_a_post = async (req, res) => {
  const { id } = req.params;

  try {
    if (mongoose.isValidObjectId(id)) {
      const post = await Post.findById(id);
      if (post) {
        return res.status(200).json({ post });
      }
    } else {
      res.status(400).json({
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Post not found",
    });
  }

  res.status(200).json({
    message: `post by ${id}`,
  });
};

const get_all_posts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json({
    posts,
  });
};

const edit_a_post = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  console.log("pended update ", req.body);
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }
  const updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    { title, content, tags },
    { new: true }
  );
  console.log(updatedPost);
  if (!updatedPost) {
    return res.status(404).json({ error: "Post not found" });
  }
  console.log("UpdatedPost", updatedPost);
  res.status(200).json({
    updatedPost: updatedPost,
  });
};

const delete_a_post = async (req, res) => {
  const { id } = req.params;
  const { author } = req.body;
  console.log("author", author);
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }
  try {
    if (mongoose.isValidObjectId(id)) {
      const post = await Post.findById(id);
      if (post) {
        if (author.id == post.author.id) {
          const deletedPost = await Post.findByIdAndDelete({ _id: id });
          if (deletedPost) {
            return res.status(200).json({ deletedPost });
          }
        }
        return res.status(400).json({ error: "Only author can delete post" });
      }
    } else {
      res.status(400).json({
        message: "Cannot delete because post not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Cannot delete because post not found",
    });
  }
};

//const delete_all_post = async (req, res) => {
//   // res.status(200).json({
//   //       message: "all posts",
//   // });
//   try {
//     await Post.deleteMany({});
//     res.status(200).json({ message: "All posts deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting posts:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

module.exports = {
  get_a_post,
  get_all_posts,
  edit_a_post,
  delete_a_post,
  create_a_post,
};
