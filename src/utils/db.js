const mongoose = require("mongoose");
require('dotenv').config();

const connect = async () => {
  try {
    const URI = process.env.URI;
    await mongoose.connect(URI, {
      // useNewUrlParser: true, !deprecated
      // useUnifiedTopology: true, !deprecated
    });
    console.log("Connected to DB 🚀!!");
  } catch (err) {
    console.log("Not connected to DB ❌, error:", err);
  }
};

module.exports = connect;
