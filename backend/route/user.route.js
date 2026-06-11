const express = require("express")
 const userrouter = express.Router()
 const {UserSignup, UserLogin} = require("../controller/user.controller")

 userrouter.post("/signup",UserSignup)
 userrouter.post("/login",UserLogin)



 module.exports = userrouter