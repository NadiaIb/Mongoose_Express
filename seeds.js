// Run this file on its own any time I want new data in the DB
const mongoose = require("mongoose");
const Product = require("./models/product");

main().catch((err) => console.log("Mongo connection error!", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/farmStand");
  console.log("Mongo connection open");
}

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Organic Goddess Melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

//CHECK IF DATA IS INSERTED
//NODE = node seeds.js
//MONGO = show dbs, use farmStand, show collections, db.products.find()

