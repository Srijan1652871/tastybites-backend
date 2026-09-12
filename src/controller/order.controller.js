const Order = require("../model/order.model");
const User = require("../model/user.model");

// ─── User: Place a single-item order ─────────────────────────────
const createOrder = async (req, res) => {
  try {
    const { menuItemId, name, price, quantity, image, deliveryDetails } = req.body;

    if (!menuItemId || !name || !price || !deliveryDetails) {
      return res.status(400).json({ success: false, message: "Missing required order fields." });
    }

    const totalAmount = price * (quantity || 1);

    const order = await Order.create({
      userId: req.user.id,
      item: { menuItemId, name, price, quantity: quantity || 1, image },
      totalAmount,
      deliveryDetails,
    });

    // Remove item from user cart after ordering
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter((c) => c.menuItemId.toString() !== menuItemId);
    await user.save();

    res.status(201).json({ success: true, message: "Order placed successfully!", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── User: Get own orders ─────────────────────────────────────────
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Admin: Get all orders ───────────────────────────────────────
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId", "username email");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Admin: Update order status ──────────────────────────────────
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    order.status = status;
    const updated = await order.save();
    res.status(200).json({ success: true, message: "Order status updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Admin: Delete order ─────────────────────────────────────────
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }
    res.status(200).json({ success: true, message: "Order deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder };
