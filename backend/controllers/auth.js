const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName(), isSeller: user.isSeller }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare the password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.getName(), isSeller: user.isSeller }, token });
};

const seller = async (req, res) => {
  const {
    user: { userId },
    body: { isSeller},
  } = req;
  console.log(req);

  const seller = await User.findOneAndUpdate(
    { _id: userId },
    { isSeller: isSeller },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ seller: { name: seller.getName(), isSeller: seller.isSeller }, token });
}

module.exports = {
  register,
  login,
  seller
};
