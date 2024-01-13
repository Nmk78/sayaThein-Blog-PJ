const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    id: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImgUrl: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    author: {
      type: authorSchema,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("BlogPost", postSchema);

module.exports = Post;
