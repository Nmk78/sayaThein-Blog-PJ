const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    author: {
      type: authorSchema,
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('BlogPost', postSchema);

module.exports = Post;
