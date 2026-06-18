const express = require("express")
 const userrouter = express.Router()
 const {UserSignup, UserLogin,verifyOtp} = require("../controller/user.controller")

 userrouter.post("/signup",UserSignup)
 userrouter.post("/login",UserLogin)
 userrouter.patch("/verifyotp",verifyOtp)



 module.exports = userrouter