const User = require("../model/user.model");
const Menu = require("../model/menuItem.model");

const getStats = async (req, res) => {
  try {
    const totalMenuItems = await Menu.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalMenuItems,
        totalUsers,
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