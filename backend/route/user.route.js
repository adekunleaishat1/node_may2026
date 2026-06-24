const express = require("express")
 const userrouter = express.Router()
 const {UserSignup, UserLogin,verifyOtp,verifydashbaord, UploadProfile} = require("../controller/user.controller")
 const validateToken = require("../middleware/validation")

 userrouter.post("/signup",UserSignup)
 userrouter.post("/login",UserLogin)
 userrouter.patch("/verifyotp",verifyOtp)
 userrouter.get("/verifydashboard",verifydashbaord)
 userrouter.put("/profile/upload", validateToken,UploadProfile)


 module.exports = userrouter