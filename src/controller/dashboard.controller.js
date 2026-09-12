const User = require("../model/user.model");
const Menu = require("../model/menuItem.model");
const Reservation = require("../model/reservation.model");
const Contact = require("../model/contact.model");
const Order = require("../model/order.model");

const getStats = async (req, res) => {
  try {
    const totalMenuItems = await Menu.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const pendingReservations = await Reservation.countDocuments({ status: "Pending" });
    const totalMessages = await Contact.countDocuments();
    const availableMenuItems = await Menu.countDocuments({ availability: true });
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    // Fetch 3 most recent reservations for dashboard preview
    const recentReservations = await Reservation.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("name guests date time status");

    // Fetch 3 most recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("userId", "username email")
      .select("userId item totalAmount status createdAt");

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalMenuItems,
        totalUsers,
        totalReservations,
        pendingReservations,
        totalMessages,
        availableMenuItems,
        totalOrders,
        pendingOrders,
        recentReservations,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
};