const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
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
      unique: true, // Ensures that each email is unique
      lowercase: true, // Converts email to lowercase
      trim: true, // Removes leading and trailing whitespaces
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Basic email format validation
    },
    password: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Use a consistent naming convention for models (capitalized and singular)
// const UserModel = mongoose.model("User", userSchema, "users");
//export default UserModel;

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;


