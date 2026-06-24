const jwt = require("jsonwebtoken")

const ValidateToken = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
           return res.status(400).json({message:"Invalid Token", status:false}) 
        }
      const verifiedToken =  await jwt.verify(token, process.env.SECRETKEY)
      console.log(verifiedToken);
      
       if (verifiedToken) {
        req.user = verifiedToken.email
        next() 
       }
    } catch (error) {
      return res.status(500).json({message:error.message, status:false}) 
    }
}

module.exports = ValidateToken