const Store = require('../models/Store');
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getStoreById = async (req, res) => {
  const {
    user: { userId },
    params: { id: storeId },
  } = req;
  
  const store = await Store.findOne({ _id: storeId, owner: userId });
  if (!store) {
    throw new NotFoundError(`No store with id: ${storeId}`);
  }
  res.status(StatusCodes.OK).json({ store });
}

const getStoreByOwner = async (req, res) => {
  const {
    user: { userId },    
  } = req;

  const store = await Store.findOne({ owner: userId });
  if (!store) {
    throw new NotFoundError(`This user has no store: ${userId}`);
  }
  res.status(StatusCodes.OK).json({ store });
}


const registerStore = async (req, res) => {
  req.body.owner = req.user.userId;
  const store = await Store.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ store });
}


const updateStore = async (req, res) => {
  const {
    user: { userId },
    params: { id: storeId },
    body: { name, description, address, contact },
  } = req;

  if (!name || !address || !description || !contact) {
    throw new BadRequestError("Please provide all values");
  }

  const store = await Store.findOneAndUpdate(
    { _id: storeId, owner: userId },
    {...req.body},
    { new: true, runValidators: true }
  );

  if (!store) {
    throw new NotFoundError(`No store with id: ${storeId}`);
  }
  res.status(StatusCodes.OK).json({ store });
}

module.exports = {
  getStoreById, registerStore, updateStore, getStoreByOwner
}