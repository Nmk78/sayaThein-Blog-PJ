const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(
      "DB connected     Host -",
      connect.connection.host, "    DB name -",
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

};

module.exports = connectToDB;
