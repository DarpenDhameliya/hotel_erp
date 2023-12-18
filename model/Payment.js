const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  orderdate: {
    type: Date,
    required: [true, "Date Required !!"],
  },
  orderid: {
    type: String,
    required: [true, "Date Required !!"],
  },
  amount: {
    type: Number,
    required: [true, "Amount Required !!"],
  },
 
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
