const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");

const { register, login, seller } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.patch("/register", authMiddleware, seller);

module.exports = router;
