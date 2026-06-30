const mongoose =  require("mongoose")

const productschema = mongoose.Schema({
  productname:{type:String, required:true},
  productprice:{type:Number, required:true},
  stock:{type:Number, required:true, default:0},
  productimage:{
    imageurl:{type:String, required:true},
    public_id:{type:String, required:true}
  },
  productseller:{type:mongoose.Schema.Types.ObjectId, ref:"users_collection", required:true}
})

const productmodel = mongoose.model("products", productschema)

module.exports = productmodel