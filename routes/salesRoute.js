const salesController =require("../controllers/salesController")
const express =require("express");
const router =express.Router()

router.post("/sales",salesController)

module.exports = router