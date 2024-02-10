const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const isSellerMiddleware  = require("../middlewares/seller");

const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require("../controllers/products");

router.get('/', getAllProducts);
router.get('/my-products', authMiddleware, isSellerMiddleware, getMyProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware,isSellerMiddleware, createProduct);
router.patch('/:id', authMiddleware, isSellerMiddleware, updateProduct);
router.delete('/:id', authMiddleware, isSellerMiddleware, deleteProduct);

module.exports = router;
