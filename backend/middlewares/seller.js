const { ForbiddenError } = require("../errors");
const User = require("../models/User");

const isSellerMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById({ _id: userId});
    
    if (user && user.isSeller === true) {
      next();
    } else {
      throw new ForbiddenError("Access denied. User is not a seller.");
    }
  } catch (error) {}
};

module.exports = isSellerMiddleware;
