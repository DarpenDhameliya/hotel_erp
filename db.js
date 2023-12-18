const mongoose = require("mongoose");

const mongourl = `mongodb+srv://darpensstpl:BnrKB3DBCeEiWC2x@cluster0.udjynea.mongodb.net/hotel?retryWrites=true&w=majority`;

const mongoconnect = async () => {
  try {
    mongoose
      .connect(mongourl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((result) => {
        console.log("connect");
      });
  } catch (error) {
    console.log("mongoose error ===================>", error);
  }
};

module.exports = mongoconnect;


