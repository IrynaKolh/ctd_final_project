const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const isSellerMiddleware  = require("../middlewares/seller");
const { getStoreById, registerStore, updateStore } = require("../controllers/store");

const router = express.Router();

router.get('/:id', authMiddleware, getStoreById);
router.post('/', authMiddleware, isSellerMiddleware, registerStore);
router.patch('/:id', authMiddleware, isSellerMiddleware, updateStore);

module.exports = router;