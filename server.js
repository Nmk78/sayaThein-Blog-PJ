import express, { json } from "express";
const dotenv = require("dotenv").config();
import cors from 'cors';

//Routes
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import privateRoutes from "./routes/private";
import errorHandler from "./middleware/errorHandler";
import connectToDB from "./dbConnection";

connectToDB();

const app = express();

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
app.use(json());
app.use(cors());
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/post", privateRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running! ");
});
