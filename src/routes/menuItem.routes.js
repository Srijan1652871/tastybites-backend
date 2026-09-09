const express = require("express");
const authentication = require("../middleware/authentication.middleware")
const upload = require("../middleware/upload.middleware")
const {
  getMenuItemList,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
}=require("../controller/menuItem.controller");
const router=express.Router()

router.get("/",getMenuItemList)
router.get("/:id",getMenuItemById)
router.post("/admin",authentication,upload.single("image"),createMenuItem)
router.put("/admin/:id",authentication,upload.single("image"),updateMenuItem)
router.delete("/admin/:id",authentication,deleteMenuItem)
module.exports=router;