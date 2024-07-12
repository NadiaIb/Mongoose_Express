const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Product = require("./product");

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

farmSchema.post("findOneAndDelete", async function (farm) {
  if (farm.products.length) {
    const res = await Product.deleteMany({ _id: { $in: farm.products } }); // select all products in products schema where id is in products array in the farm we just deleted
    console.log(res);
  }
});

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
