const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  orderid: {
    type: String,
    required: [true, "Id Required !!"],
  },
  amount: {
    type: Number,
    required: [true, "Amount Required !!"],
  },
  receiveamount: {
    type: Number,
  },
  Receive: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
  },
  drinkamount: {
    type: Number,
  },
  orderdate: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("payment", PaymentSchema);
module.exports = Payment;
