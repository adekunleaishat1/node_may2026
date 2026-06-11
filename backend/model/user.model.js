const mongoose = require("mongoose")

const userschema = mongoose.Schema({
  username:{type:String, required:true,trim:true},
  email:{type:String, unique:true,trim:true, required:true},
  password:{type:String,trim:true, required:true}
})

const usermodel = mongoose.model("users_collection",userschema)

module.exports = usermodel