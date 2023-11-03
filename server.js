const express = require('express');
const dotenv = require('dotenv').config()

//Routes
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post');
const privateRoutes = require('./routes/private');
const errorHandler = require('./middleware/errorHandler');
const connectToDB = require("./dbConnection") ;

connectToDB();

const app = express()

app.get('/', (req, res)=>{
      res.status(200).json({
            message: "all posts",
      });
})
app.use((req, res, next)=>{
      console.log(req.path, req.method);
      next()
})
app.use(express.json())
app.use("/user", userRoutes)
app.use("/posts", postRoutes)
app.use("/post", privateRoutes)
app.use(errorHandler)



app.listen(process.env.PORT, ()=>{
      console.log("Server is running! ");
})

