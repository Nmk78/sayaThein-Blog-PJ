// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true, // Ensures that each email is unique
//       lowercase: true, // Converts email to lowercase
//       trim: true, // Removes leading and trailing whitespaces
//       match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Basic email format validation
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     code: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// // export default mongoose.model("User", userSchema);

// // Use a consistent naming convention for models (capitalized and singular)
// // const UserModel = mongoose.model("User", userSchema);
// // export default UserModel;

// const User = mongoose.model("User", userSchema) || mongoose.models.User;

// export default User;


import mongoose, { Schema } from "mongoose";

let User;

try {
  // Try to get the existing model
  User = mongoose.model("User");
} catch (error) {
  // If the model doesn't exist, create it
  User = mongoose.model("User", new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  }, { timestamps: true }));
}


export default User;
