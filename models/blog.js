const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  tags: {
    type: [String],
    default: [],
  },
},{timestamps: true});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;