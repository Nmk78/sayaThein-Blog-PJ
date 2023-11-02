const express = require('express');
const dotenv = require('dotenv').config()

//Routes
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

const app = express()

app.use((req, res, next)=>{
      console.log(req.path, req.method);
      next()
})

app.get('/', (req, res)=>{
      res.send("Hello World!")
})

app.use("/user", userRoutes)
app.use("/posts", postRoutes)

app.listen(process.env.PORT, ()=>{
      console.log("Server is running! ");
})