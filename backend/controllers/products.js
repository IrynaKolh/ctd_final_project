const Product = require("../models/Product");
const Store = require("../models/Store");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllProducts = async (req, res) => {
  const { name, sort, category } = req.query;
  const queryObject = {};
  // if name is exists in query
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  //  if category is exists in query
  if (category) {
    queryObject.category = category;
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList); //transform mongoose query object
  } else {
    result = result.sort("-createdAt");
  }

  const productsCount = await Product.countDocuments(queryObject);

  // limit and skip - pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(StatusCodes.OK).json({ products, count: productsCount });
};

const getMyProducts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const store = await Store.findOne({ owner: userId });

    if (!store) {
      throw new NotFoundError(`Store not found for user: ${userId}`);
    }

    const productsCount = await Product.countDocuments({ storeId: store._id });
     // limit and skip - pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    let result = Product.find({ storeId: store._id }).sort(
      "createdAt"
    );
    result = result.skip(skip).limit(limit);
    
    const products = await result;
    res.status(StatusCodes.OK).json({ products, count: productsCount });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
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

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ product,  msg: "Product has been successfully created" });
};

const updateProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;
    const store = await Store.findOne({ owner: userId });

    if (!store) {
      throw new NotFoundError(`Store not found for user: ${userId}`);
    }
    const { name, price, description, category, imageUrl, storeId } = req.body;

    if (!name || !price || !description || !category || !imageUrl || !storeId) {
      throw new BadRequestError("Please provide all values");
    }

    const product = await Product.findOneAndUpdate(
      { _id: productId, storeId: store._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      throw new NotFoundError(`No product with id: ${productId}`);
    }
    res.status(StatusCodes.OK).json({ product, msg: "Product has been successfully updated" });
    // res.send("Product has been successfully updated");
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;
    const store = await Store.findOne({ owner: userId });

    if (!store) {
      throw new NotFoundError(`Store not found for user: ${userId}`);
    }
    const product = await Product.findOneAndDelete({
      _id: productId,
      storeId: store._id,
    });
    if (!product) {
      throw new NotFoundError(`No product with id: ${productId}`);
    }
    res
      .status(StatusCodes.OK)
      .json({ msg: "Product has been successfully deleted" });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
};
