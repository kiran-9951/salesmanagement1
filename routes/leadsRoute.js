const leadsController =require("../controllers/leadsController")
const express =require("express")
const router =express.Router();

router.post("/leads",leadsController);
module.exports =router