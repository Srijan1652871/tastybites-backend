const express = require("express");
const authentication = require("../middleware/authentication.middleware")
const { getStats }=require("../controller/dashboard.controller")
const router=express.Router()
router.get("/admin/getStats",authentication,getStats)
module.exports=router;
