const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name Required !!"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity Required!!"],
  },
  price: {
    type: Number,
    required: [true, "Price Required !!"],
  },
  status: {
    type: String,
    required: [true, "Status Required !!"],
    enum: ["active", "deactive"],
  },
  mesur: {
    type: String,
    enum: ["kg", "unit"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
