const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const isSellerMiddleware  = require("../middlewares/seller");
const { getStoreById, registerStore, updateStore, getStoreByOwner } = require("../controllers/store");

const router = express.Router();

router.get('/my-store', authMiddleware, isSellerMiddleware, getStoreByOwner);
router.post('/', authMiddleware, isSellerMiddleware, registerStore);
router.get('/:id', authMiddleware, getStoreById);
router.patch('/:id', authMiddleware, isSellerMiddleware, updateStore);

module.exports = router;