const express = require("express");
const authentication = require("../middleware/authentication.middleware")
const { getAllUsers, deleteUser }=require("../controller/user.controller")

const router=express.Router()
router.get("/admin",authentication,getAllUsers)
router.delete("/admin/:id",authentication,deleteUser)

module.exports=router