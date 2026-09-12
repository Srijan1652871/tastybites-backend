const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    // Quick Info fields
    calories: {
      type: String,
      default: "",
    },
    prepTime: {
      type: String,
      default: "",
    },
    servings: {
      type: String,
      default: "",
    },
    // Dietary tags e.g. ["Gluten-Free", "Vegan", "Chef Recommended"]
    dietaryTags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;

