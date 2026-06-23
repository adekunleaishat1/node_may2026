const express = require("express")
 const userrouter = express.Router()
 const {UserSignup, UserLogin,verifyOtp,verifydashbaord} = require("../controller/user.controller")

 userrouter.post("/signup",UserSignup)
 userrouter.post("/login",UserLogin)
 userrouter.patch("/verifyotp",verifyOtp)
 userrouter.get("/verifydashboard",verifydashbaord)



 module.exports = userrouter