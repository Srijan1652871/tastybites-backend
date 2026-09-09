const User = require("../model/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existUser = await User.findById(id);
    if (!existUser) {
      return res.status(500).json({
        success: false,
        message: "User not found!!",
      });
    }
    console.log("Deleted User:", existUser);
    await User.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "User Deleted successfully",
      data: existUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};