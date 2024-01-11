import mongoose from "mongoose";

export const connectToMongoDB = async () =>{

      console.log("MongoDB", process.env.MONGO_DB_URI);
      try {
            
            await mongoose.connect(process.env.MONGO_DB_URI, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
                });
            console.log('\x1b[32m%s\x1b[0m',"Connected to DB");
      } catch (error) {
            console.log('\x1b[31m%s\x1b[0m',"Error While Connecting to Mongo DB - mongodb.js",error);
      }

} 