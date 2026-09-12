const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, adminPassword } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(500).json({
        success: false,
        message: "Email Already Register!!",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    
    let role="user"
    if (adminPassword !== undefined) {
      if (adminPassword !== process.env.ADMIN_SECRET) {
        return res.status(500).json({
          success: false,
          message: "Incorrect admin password",
        });
      }

      role = "admin";
    }

    const response = await User.create({
      username,
      email,
      password: hashpassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(500).json({
        success: false,
        message: "User Not Registered!!",
      });
    }

    const passwordcheck = await bcrypt.compare(password, existUser.password);
    if (!passwordcheck) {
      return res.status(500).json({
        success: false,
        message: "Password does not match!!",
      });
    }

    const token = jwt.sign(
      {
        id: existUser._id,
        username: existUser.username,
        email: existUser.email,
        role: existUser.role,
      },
      process.env.JWT_SECRET_KEY,
    );

    res.status(200).json({
      success: true,
      message: "User Login successful",
      token,
      user: existUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(500).json({
        success: false,
        message: "User not found!!",
      });
    }

    if (username) {
      existUser.username = username;
    }
    if (password) {
      existUser.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await existUser.save();
    res.status(200).json({
      success: true,
      message: "User Updated successfully",
      data: updatedUser,
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
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(500).json({
        success: false,
        message: "User not found!!",
      });
    }

    const passwordcheck = await bcrypt.compare(password, existUser.password);
    if (!passwordcheck) {
      return res.status(500).json({
        success: false,
        message: "Password does not match!!",
      });
    }

    await User.deleteOne({ email });
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
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
