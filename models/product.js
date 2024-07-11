const mongoose = require("mongoose");
const { Schema } = require('mongoose');

//CREATE SCHEMA
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["fruit", "vegetable", "dairy"],
  },
  farm: {
    type: Schema.Types.ObjectId,
    ref: "Farm", //ref Farm model
  },
});

// MAKE MODEL
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
