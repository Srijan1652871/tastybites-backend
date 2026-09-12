const User = require("../model/user.model");

// ─── Admin ───────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -wishlist -cart");
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existUser = await User.findById(id);
    if (!existUser) {
      return res.status(404).json({ success: false, message: "User not found!!" });
    }
    await User.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "User Deleted successfully", data: existUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── User: Get own profile with cart & wishlist ───────
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("wishlist", "name price image category availability")
      .populate("cart.menuItemId", "name price image category availability");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Wishlist: toggle (add if not present, remove if present) ───
const toggleWishlist = async (req, res) => {
  try {
    const { menuId } = req.params;
    const user = await User.findById(req.user.id);

    const isInWishlist = user.wishlist.some((id) => id.toString() === menuId);
    if (isInWishlist) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== menuId);
    } else {
      user.wishlist.push(menuId);
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      inWishlist: !isInWishlist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Cart: add or increment quantity ───────────────────
const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity = 1 } = req.body;
    const user = await User.findById(req.user.id);

    const existingIdx = user.cart.findIndex(
      (c) => c.menuItemId.toString() === menuItemId
    );
    if (existingIdx > -1) {
      // Already in cart — just increment quantity
      user.cart[existingIdx].quantity += quantity;
    } else {
      user.cart.push({ menuItemId, quantity });
    }
    await user.save();
    res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Cart: remove a specific item ──────────────────────
const removeFromCart = async (req, res) => {
  try {
    const { menuId } = req.params;
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter((c) => c.menuItemId.toString() !== menuId);
    await user.save();
    res.status(200).json({ success: true, message: "Removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getMe,
  toggleWishlist,
  addToCart,
  removeFromCart,
};