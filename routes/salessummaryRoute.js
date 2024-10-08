const  salessummaryController =require("../controllers/salessummaryController")
const express =require("express")
const router =express.Router();

router.get("/summary/:agent_email",salessummaryController)

module.exports =router