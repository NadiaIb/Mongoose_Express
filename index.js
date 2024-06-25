const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Product = require("./models/product"); // require in product schema and model created

//MIDDLEWARE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//CONNECT TO MONGO
main().catch((err) => console.log("Mongo connection error!", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/farmStand");
  console.log("Mongo connection open");
}

app.get("/products", async (req, res) => {
  // returns thenable(promise like thing) so await response
  const products = await Product.find({});
  res.render("products/index", { products }); // looks into views/products/index, passes {products} info to ejs file
});

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.post("/products", async (req, res) => {
  // req.body will be undefined, needs to be parsed - add app.use(express.urlencoded({ extended: true })) middleware
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct);
  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id); // findById = mongoose method
  // console.log(product);
  res.render("products/details", { product });
});

app.listen(3000, () => {
  console.log("APP LISTENING ON PORT 30000");
});
