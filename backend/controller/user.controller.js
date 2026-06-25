const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
 const sendemailVerification =  require("../utils/verificationMail")
 const {generateOtp} = require("../utils/generateOtp")
 const otpmodel = require("../model/otp.model")
 const jwt = require("jsonwebtoken")
 const cloudinary = require("../utils/cloudinary")

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
      console.log(req.body);
      
        const {email, password} = req.body
        if (!email || !password) {
          return res.status(400).json({message:"All fields are mandatory", status:false}) 
        }
      
     const existuser =  await usermodel.findOne({email})
     console.log(existuser);
     
     if (existuser) {
      const confirmPassword =  await bcrypt.compare(password, existuser.password)
      console.log(confirmPassword);
      
      if (confirmPassword) {

        if (!existuser.verified) {
          return res.status(400).json({message:"please verify your email", status:false})  
        }
         const token =  await jwt.sign({email},process.env.SECRETKEY,{expiresIn:300})

        return res.status(200).json({message:"login successfully",token, status:true})  
      }
      return res.status(400).json({message:"Invalid email or password", status:false})  
     }
     return res.status(407).json({message:"Invalid email or password", status:false})  
    } catch (error) {

        console.log(error);
        res.status(500).json({message:error.message, status:false})
        
    }
}

const verifyOtp = async (req,res) =>{
    try {
         const {verificationOtp} = req.body
         console.log(verificationOtp);
         
         if (!verificationOtp) {
           return res.status(400).json({message:"Invalid otp", status:false})
         }

      const otp =  await otpmodel.findOne({otp:verificationOtp})
      console.log(otp);
      if (!otp) {
        return res.status(405).json({message:"otp has expired ", status:false})
      }
      const verifiedUser = await usermodel.findOneAndUpdate({email:otp.email},{verified:true},{new:true})
      console.log(verifiedUser);
      if (verifiedUser) {
        return res.status(200).json({message:"Email verified", status:true})  
      }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message, status:false})
        
    }
}

const verifydashbaord = async(req , res) =>{
  try {
    const token = req.headers.authorization.split(" ")[1]
   if (!token) {
    return res.status(400).json({message:"invalid token", status:false})
   }
  const verifiedToken =  await jwt.verify(token, process.env.SECRETKEY)
  console.log(verifiedToken);
  if (verifiedToken) {
    const currentuser =  await usermodel.findOne({email:verifiedToken.email}).select(" _id email username")
    console.log(currentuser);
    return res.status(200).json({message:"token verified", currentuser, status:true})
  }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message, status:false})
     
  }
}


const UploadProfile = async(req ,res) =>{
  try {
    const user = req.user
    const {image }= req.body
   if (!image) {
    return res.status(400).json({message:"image cannot be empty", status:false})
   }
   const existuser = await usermodel.findOne({email:user})
   if (existuser.profilepicture.url && existuser.profilepicture.public_id) {
      await cloudinary.uploader.destroy(existuser.profilepicture.public_id)
   }

    const uploadedimage =   await cloudinary.uploader.upload(image)
    console.log(uploadedimage);
    if (uploadedimage) {
    const updateduser =  await usermodel.findOneAndUpdate({email:user},
        {profilepicture:{
          url:uploadedimage.secure_url,
          public_id:uploadedimage.public_id
        }},
        {new:true}
      )

      console.log(updateduser);
      return res.status(200).json({message:"profile picture updated successfully", status:true})
    }
  } catch (error) {
    console.log(error);
    
  }
}


module.exports ={ UserSignup, UserLogin, verifyOtp,verifydashbaord, UploadProfile}