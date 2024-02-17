const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a store name"],
      minlength: [3, "Storename must be at least 3 characters long"],
      maxlength: [50, "Store name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter store description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    address: {
      country: { type: String, enum: [
        "United States",
        "Mexico",
        "Canada",
      ], required: [true, "Please enter store country"] },
      street: { type: String, required: [true, "Please enter store street"] },
      city: { type: String, required: [true, "Please enter store city"] },
      state: { type: String, required: [true, "Please enter store state"] },
      zipCode: { type: String, required: [true, "Please enter store zip code"] }
    },
    contact: {
      email: { type: String, required: [true, "Please enter store email"] },
      phone: { type: String, required: [true, "Please enter store phone number"] }
    },
    socialMedia: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
      youtube: { type: String },
      tiktok: { type: String },
      website: { type: String }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
