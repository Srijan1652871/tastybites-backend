const express = require("express");
const authentication = require("../middleware/authentication.middleware");
const {
  createContact,
  getAllMessages,
} = require("../controller/contact.controller");

const router = express.Router();

// Requires login to send a message
router.post("/", authentication, createContact);

// Admin protected route
router.get("/admin", authentication, getAllMessages);

module.exports = router;

