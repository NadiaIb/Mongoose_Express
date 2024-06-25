const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');

main().catch(err => console.log('Mongo connection error!', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log("Mongo connection open");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/dog', (req,res)=>{
  res.send('woof')
})

app.listen(3000, () => {
  console.log("APP LISTENING ON PORT 30000");
});
