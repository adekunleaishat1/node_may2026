const express = require("express")
const productrouter =  express.Router()
const {UploadProduct, fetchProduct} = require("../controller/product.controller")
const verifyToken = require("../middleware/validation")


productrouter.post("/upload", verifyToken, UploadProduct)
productrouter.get("/fetch", verifyToken, fetchProduct)


module.exports = productrouter