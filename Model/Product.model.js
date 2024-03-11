const mongoose = require("mongoose");

const ProSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  img: String,
  availability: String,
  rating: [{ userid: String, value: Number }],
  colour: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Product = mongoose.model("Product", ProSchema);
module.exports = Product;
