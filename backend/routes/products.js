const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
} = require("../controllers/products");

// router.route("/").post(createProduct).get(getAllProducts);
// router
//   .route("/:id")
//   .get(getProductById)
//   .patch(updateProduct)
//   .delete(deleteProduct);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, createProduct);
router.patch('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.post('/upload', authMiddleware, upload.single('image'), uploadProductImage);

module.exports = router;
