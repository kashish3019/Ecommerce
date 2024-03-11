const verifyToken = require("../Middleware/auth");
const {Router}=require("express");
const { getsignup, signup, getlogin, login,logout, otpverify, otpform, resetEmail, forgot, reset,} = require("../Controller/user.controller");
const UserRoute=Router()

//signup
UserRoute.get("/signup",getsignup)
UserRoute.post("/signup",signup)
//login
UserRoute.get("/login",getlogin)
UserRoute.post("/login",login)
//logout
UserRoute.get("/logout",logout)
//reset password
UserRoute.post("/reset/otp",otpverify)
UserRoute.get("/reset/:otp",otpform)
UserRoute.post("/email",resetEmail)
UserRoute.get("/resetpassword",forgot)
UserRoute.post("/reset",verifyToken,reset)

module.exports = UserRoute;
