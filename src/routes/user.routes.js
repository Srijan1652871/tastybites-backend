const express = require("express");
const authentication = require("../middleware/authentication.middleware");
const {
  getAllUsers,
  deleteUser,
  getMe,
  toggleWishlist,
  addToCart,
  removeFromCart,
} = require("../controller/user.controller");

const router = express.Router();

// Admin routes
router.get("/admin", authentication, getAllUsers);
router.delete("/admin/:id", authentication, deleteUser);

// User routes
router.get("/me", authentication, getMe);
router.post("/wishlist/:menuId", authentication, toggleWishlist);
router.post("/cart", authentication, addToCart);
router.delete("/cart/:menuId", authentication, removeFromCart);

module.exports = router;