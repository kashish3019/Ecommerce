const { Router } = require("express");
const ProductRoute=Router()
const isAdmin = require("../Middleware/admin");
const { get, create, adminproduct, getcreate, getusers, cartdata, cart,getcart, updatecart, payment, products } = require("../Controller/product.controller");
const verifyToken=require("../Middleware/auth");

ProductRoute.get("/",get)
ProductRoute.get("/products",products)
ProductRoute.get("/adminProduct",isAdmin,adminproduct)
ProductRoute.get("/create",isAdmin,getcreate)
ProductRoute.get("/user",isAdmin,getusers)
ProductRoute.get("/cartdata",verifyToken,cartdata)
ProductRoute.get("/cart",isAdmin,getcart)

ProductRoute.post("/create",isAdmin,create)
ProductRoute.post("/cart",verifyToken,cart)
ProductRoute.post("/payment",verifyToken,payment)
ProductRoute.patch("/cart/update/:id",verifyToken,updatecart)

module.exports = ProductRoute;
