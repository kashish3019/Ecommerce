const verifyToken = require("../Middleware/auth");
const {Router}=require("express");
const { getsignup, signup, getlogin, login, getusers, verify, resett, reset, resetPassword } = require("../Controller/user.controller");
const UserRoute=Router()

UserRoute.get("/signup",getsignup)
UserRoute.get("/login",getlogin)
UserRoute.get("/users",verifyToken,getusers)
UserRoute.get("/verify/:token",verify)
UserRoute.get("/reset", resett);

UserRoute.post("/signup",signup)
UserRoute.post("/login",login)
UserRoute.post("/reset", reset);
UserRoute.post("/resetPassword", resetPassword); 

module.exports = UserRoute;
