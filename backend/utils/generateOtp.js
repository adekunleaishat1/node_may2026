const otpgenerator = require("otp-generator")

const generateOtp = () =>{
  const newotp =   otpgenerator.generate(4,{
        digits:true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets:true,
      specialChars: false
    })
    return newotp
}


module.exports = {generateOtp}