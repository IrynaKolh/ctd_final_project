const express = require("express");
const authMiddleware = require("../middlewares/authentication");

const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, createProduct);
router.patch('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
