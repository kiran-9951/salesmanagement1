const productController =require("../controllers/productController")
const express =require("express");
const router = express.Router();

router.post("/products",productController)

module.exports =router