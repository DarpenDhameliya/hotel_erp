const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  orderid: {
    type: Number,
    required: [true, "id Required !!"],
  },
  orderserv: {
    type: Boolean,
    required: [true, "orderserv Required !!"],
  },
  // orderdate: {
  //   type: Date,
  //   required: [true, "Date Required !!"],
  // },
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  amount: {
    type: Number,
    required: [true, "Amount Required !!"],
  },
  qty: {
    type: String,
    required: [true, "Quantity Required !!"],
  },
  orderdate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;


