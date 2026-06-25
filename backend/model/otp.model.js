const mongoose = require("mongoose")

const otpSchema =  mongoose.Schema({
    otp:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    expireAt:{
        type:Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000),
        expires: 0
    }
})

const otpmodel = mongoose.model("otp", otpSchema)

module.exports = otpmodel