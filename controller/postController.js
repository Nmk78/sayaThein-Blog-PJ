const { default: mongoose, isValidObjectId } = require("mongoose");
const Post = require("../models/postModel");

const create_a_post = async (req, res) => {
  const { title, author, content, tags } = req.body;
  /*{
                  "title": "Sample Post4",
                  "content": "This is the content of the post.",
                  "author": {
                  "id": "6544c1e3e7c71aa77bfd486c", 
                  "name": "John Doe",
                  "email": "john.doe@example.com"
                  },
                  "tags": ["tag1", "tag2"]
            }
            */
  const book = await Post.create({
    title,
    content,
    author,
    tags,
  });

  res.status(201).json({
    book,
  });
};

const get_a_post = async (req, res) => {
  const { id } = req.params;

  try {
    if (mongoose.isValidObjectId(id)) {
      const post = await Post.findById(id);
      if (post) {
        return res.status(200).json({ book });
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
  console.log(req.body);
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
  res.status(200).json({
    post: updatedPost,
  });
};

const delete_a_post = async (req, res) => {
      const{id} = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }
  const deletedPost = await Post.findByIdAndDelete({ _id: id });
  if(deletedPost){
      return res.status(200).json({deletedPost})
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
