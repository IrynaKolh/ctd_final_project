const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name must be no more than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true }
    },
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true }
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
