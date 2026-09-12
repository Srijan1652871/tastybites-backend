const Menu = require("../model/menuItem.model");
const cloudinary = require("../config/cloudinary");

const getMenuItemList = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json({
      success: true,
      message: "Menu items fetched successfully",
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(500).json({
        success: false,
        message: "Menu item not found!!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Menu item fetched successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { name, description, category, price, availability, calories, prepTime, servings, dietaryTags } = req.body;
    console.log(
      "data coming in create controller",
      name,
      description,
      category,
      price,
      availability,
    );
    console.log("image added", req.file);
    const uploadImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "tastybites/menu-items",
    });
    console.log("uploadImage", uploadImage);
    const response = await Menu.create({
      name,
      description,
      category,
      price,
      availability,
      image: {
        url: uploadImage.url,
        public_id: uploadImage.public_id,
      },
      calories: calories || "",
      prepTime: prepTime || "",
      servings: servings || "",
      dietaryTags: dietaryTags ? (Array.isArray(dietaryTags) ? dietaryTags : JSON.parse(dietaryTags)) : [],
    });
    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, availability, calories, prepTime, servings, dietaryTags } = req.body;

    const existMenuItem = await Menu.findById(id);
    if (!existMenuItem) {
      return res.status(500).json({
        success: false,
        message: "Menu item not found!!",
      });
    }

    if (name) existMenuItem.name = name;
    if (description) existMenuItem.description = description;
    if (category) existMenuItem.category = category;
    if (price) existMenuItem.price = price;
    if (availability !== undefined) existMenuItem.availability = availability;
    if (calories !== undefined) existMenuItem.calories = calories;
    if (prepTime !== undefined) existMenuItem.prepTime = prepTime;
    if (servings !== undefined) existMenuItem.servings = servings;
    if (dietaryTags !== undefined) {
      existMenuItem.dietaryTags = Array.isArray(dietaryTags) ? dietaryTags : JSON.parse(dietaryTags);
    }

    if (req.file) {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "tastybites/menu-items",
      });
      existMenuItem.image = {
        url: uploadImage.url,
        public_id: uploadImage.public_id,
      };
    }

    const updatedMenuItem = await existMenuItem.save();
    console.log("Updated data:", updatedMenuItem);
    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: updatedMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const existMenuItem = await Menu.findById(id);
    if (!existMenuItem) {
      return res.status(500).json({
        success: false,
        message: "Menu item not found!!",
      });
    }
    console.log("Deleted Menu Item:", existMenuItem);
    await Menu.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Menu item Deleted successfully",
      data: existMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMenuItemList,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
