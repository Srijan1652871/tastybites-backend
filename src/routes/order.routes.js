const express = require("express");
const authentication = require("../middleware/authentication.middleware");
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controller/order.controller");

const router = express.Router();

// User routes
router.post("/", authentication, createOrder);
router.get("/my-orders", authentication, getMyOrders);

// Admin routes
router.get("/admin", authentication, getAllOrders);
router.put("/admin/:id/status", authentication, updateOrderStatus);
router.delete("/admin/:id", authentication, deleteOrder);

module.exports = router;
