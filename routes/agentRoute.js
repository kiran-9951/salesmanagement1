const agentcontroller =require("../controllers/agentController")
const express =require("express")
const router =express.Router();

router.post("/agents",agentcontroller)

module.exports =router