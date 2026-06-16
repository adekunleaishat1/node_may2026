const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
 const sendemailVerification =  require("../utils/verificationMail")
 const {generateOtp} = require("../utils/generateOtp")
 const otpmodel = require("../model/otp.model")

const UserSignup = async  (req, res) =>{
    try {
        console.log(req.body);
        const {username, email,password} = req.body
     if (!username || !email || !password) {
      return res.status(400).json({message:"All fields are mandatory", status:false}) 
     }
    const hashedPassword =  await bcrypt.hash(password, 10)
    console.log(hashedPassword);
    

    const newuser = await usermodel.create({
        username,
        email,
        password:hashedPassword
    })
    if (!newuser) {
      return res.status(407).json({message:"Unable to register user", status:false}) 
    }
       const verificationCode = await generateOtp()
          await otpmodel.create({otp:verificationCode,email:email})
      const deliveredmail   = await  sendemailVerification(email, username, verificationCode)

      if ( deliveredmail ) {
        return res.status(200).json({message:"User register successfully", status:true})
      }  
    } catch (error) {
        console.log(error.code);
        // if (error.code == 11000) {
        // return res.status(500).json({message:"user already register", status:false})
            
        // }
        if (error.message.includes("duplicate key error collection")) {
         return res.status(500).json({message:"user already register", status:false})
            
        }
        res.status(500).json({message:error.message, status:false})
    }
}


const UserLogin = async (req, res) =>{
    try {
        const {email, password} = req.body
        if (!email || !password) {
          return res.status(400).json({message:"All fields are mandatory", status:false}) 
        }
      
     const existuser =  await usermodel.findOne({email})
     console.log(existuser);
     
     if (existuser) {
      const comfirmPassword =  await bcrypt.compare(password, existuser.password)
      if (comfirmPassword) {
      return res.status(200).json({message:"login successfully", status:true})  
        
      }
      return res.status(407).json({message:"Invalid email or password", status:false})  
     }
    return res.status(407).json({message:"Invalid email or password", status:false})  
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message, status:false})
        
    }
}

module.exports ={ UserSignup, UserLogin}