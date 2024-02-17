const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      minlenght: [3, "Product name should be atleast 3 characters"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxlength: [5, "Product price cannot exceed 5 characters"],      
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    imageUrl: [{
      type: String,
      required: [true, "Please enter product image"],
    }],
    reviews: [{ body: String, date: Date, userId: String }],
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Store is required"],
    },
    category: {
      type: String,
      enum: [
        "Cakes",
        "Cookies",
        "Pies",
        "Breads",
        "Cupcakes",
        "Waffles",
        "Others",
      ],
      default: "Others",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
