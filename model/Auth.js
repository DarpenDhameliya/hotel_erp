const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Required !!"],
  },
  password: {
    type: String,
    required: [true, "Password Required !!"],
  },
  userid: {
    type: String,
    unique: true,
    required: [true, "User Id Required !!"],
  },
  status: {
    type: String,
    required: [true, "Status Required !!"],
    enum: ["active", "deactive"],
  },
  type: {
    type: String,
    required: [true, "Type Required !!"],
    enum: ["admin", "service", "kitchen"],
  },
  signintoken: {
    type: String,
  },
  token: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Auth = mongoose.model("auth", AuthSchema);
module.exports = Auth;
