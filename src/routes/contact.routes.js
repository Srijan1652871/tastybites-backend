const express = require("express");
const authentication = require("../middleware/authentication.middleware");
const {
  createContact,
  getAllMessages,
} = require("../controller/contact.controller");

const router = express.Router();

// Public - anyone can send a message
router.post("/", createContact);

// Admin protected route
router.get("/admin", authentication, getAllMessages);

module.exports = router;
