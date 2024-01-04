const mongoose = require("mongoose");

const ProSchema = new mongoose.Schema({
  title: String,
  price: Number,
  desc: String,
  category: String,
  img: String,
  stock: Number,
  rating: [{ userid: String, value: Number }],
  size: String,
  colour: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Product = mongoose.model("Product", ProSchema);
module.exports = Product;
