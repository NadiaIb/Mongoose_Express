const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product"); // require in product schema and model created

const categories = Product.schema.obj.category.enum; //gives list of categories, for the category select to be prefilled on edit page

//MIDDLEWARE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // using put request to  edit form

//CONNECT TO MONGO
main().catch((err) => console.log("Mongo connection error!", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/farmStand");
  console.log("Mongo connection open");
}

app.get("/products", async (req, res) => {
  // returns thenable(promise like thing) so await response
  const { category } = req.query;
  if(category){
    const products = await Product.find({category});
    res.render("products/index", { products, category }); // looks into views/products/index, passes {products} info to ejs file
  }else{
    const products = await Product.find({});
    res.render("products/index", { products, category:'All' });
  }
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
  // req.body will be undefined, needs to be parsed - add app.use(express.urlencoded({ extended: true })) middleware
  const newProduct = new Product(req.body);
  await newProduct.save();
  // console.log(newProduct);
  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id); // findById = mongoose method
  // console.log(product);
  res.render("products/details", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  // console.log(req.body)
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  }); //WHAT IS NEW AND RUN VAL?
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("APP LISTENING ON PORT 30000");
});
