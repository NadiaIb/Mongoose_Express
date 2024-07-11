const mongoose = require("mongoose");
const { Schema } = require("mongoose");

//ONE TO MANY RELATIONSHIP
// One Farm can have more than one products, but one product belongs to one farm.

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farm must have a name"],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email required"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product", //ref Product model
    },
  ],
});

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
