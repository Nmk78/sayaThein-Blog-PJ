const express = require("express");
const dotenv = require("dotenv").config();
const cors = require('cors');

//Routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const privateRoutes = require("./routes/private");
const errorHandler = require("./middleware/errorHandler");
const connectToDB = require("./dbConnection");

connectToDB();

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://wyt-blog.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
    guide: {
      userRoutes: "/user/:id",
      userRoutes: "/user/posts/",
      postsRoutes: { allPosts: "/posts",onePosts: "/posts/:id", search: "/posts/search" },
      privateRoutes: { create: "post/create",editAndDelete: "/:id" },
    },
  });
});
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/post", privateRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running! ");
});
