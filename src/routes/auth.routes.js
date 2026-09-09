const express = require("express");
const { registerUser, loginUser, updateUser, deleteUser }=require("../controller/auth.controller");

const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.put("/update",updateUser)
router.delete("/delete",deleteUser)

module.exports=router;
