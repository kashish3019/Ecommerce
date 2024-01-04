const express = require("express");
const connect = require("./Config/db");
const cookie = require("cookie-parser");
const UserRoute = require("./Routes/user.route");
const ProductRoute = require("./Routes/Product.route");
const session=require("express-session");
const verifyToken = require("./Middleware/auth");
const app = express();
app.use(express.json());

app.use(cookie());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRoute);
app.use("/product", ProductRoute);
app.get("/",verifyToken,(req,res)=>{
  res.render("home")
})
app.listen(8000, () => {
  connect();
  console.log("Listening on 8000");
});
