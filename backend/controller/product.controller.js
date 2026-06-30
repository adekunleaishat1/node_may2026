const productmodel = require("../model/product.model")
const cloudinary = require("../utils/cloudinary")
const usermodel = require("../model/user.model")

const UploadProduct = async (req, res) =>{
  try {
   console.log(req.user);
  const user = req.user
   const { productname, productprice, stock, productimage } = req.body;
   if (!productname || !productprice || !stock || !productimage) {
    return res.status(400).json({ message: "All fields are required" });
   }
    const existuser =  await usermodel.findOne({email:user})
    if (!existuser) {
      return res.status(400).json({ message:"Invalid User" }); 
    }

    const uploadedimage  = await cloudinary.uploader.upload(productimage)
     
   const newproduct = await productmodel.create({
       ...req.body,
       productimage:{
        imageurl:uploadedimage.secure_url,
        public_id:uploadedimage.public_id
       },
       productseller:existuser._id 
    })
    if (newproduct) {
      return res.status(200).json({ message:"product uploaded successfully" }); 
        
    }
 
  } catch (error) {
      return res.status(500).json({ message:error.message }); 
    
  }
}

const fetchProduct = async (req, res)=>{
    try {
      const allproduct =  await productmodel.find()
      .select('productname productprice productseller')
      .populate('productseller' ,'username')

      if (allproduct) {
      return res.status(200).json({ message:"product fetched successfully", allproduct }); 
        
      }
    } catch (error) {
      return res.status(500).json({ message:error.message }); 
        
    }
}

module.exports = {UploadProduct, fetchProduct}