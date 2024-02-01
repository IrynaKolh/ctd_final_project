const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const cloudinary = require('../db/cloudinaryConfig');

const getAllProducts = async (req, res) => {
  const products = await Product.find().sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getProductById = async (req, res) => {
  const {   
    params: { id: productId },
  } = req;
  const product = await Product.findOne({
    _id: productId,
  });
  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const uploadProductImage = async (req, res) => {
  if (!req.file) {
    throw new BadRequestError("No file uploaded");
  }
  const productImage = req.file;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload image");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload image smaller than 1MB");
  }

  try {
    const result = await cloudinary.uploader.upload(productImage.buffer);
    res.status(StatusCodes.OK).json({ image: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const {
    body: { name, price, description, type },
    user: { userId },
    params: { id: productId },
  } = req;

  if (!name || !price || !description || !type) {
    throw new BadRequestError("Please provide all values");
  }

  const product = await Product.findOneAndUpdate(
    { _id: productId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
  // res.send("Product has been successfully updated");
};

const deleteProduct = async (req, res) => {
   const {
     user: { userId },
     params: { id: productId },
   } = req;

   const product = await Product.findOneAndRemove({
     _id: productId,
     createdBy: userId,
   });
   if (!product) {
     throw new NotFoundError(`No product with id: ${productId}`);
   }
   res
     .status(StatusCodes.OK)
     .json({ msg: "Product has been successfully deleted" });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
};
