const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Seller = require("../models/Seller");
const bcrypt = require("../helpers/bcrypt");

const changePassword = async (id, newPassword) => {
  try {
    const seller = await Seller.findOne({
      _id: id,
      isDelete: false,
    });

    if (!seller)
      return {
        status: false,
        message: "Account does not exist or has already been deleted!",
      };

    const passwordHashed = await bcrypt.bcryptHash(newPassword);
    seller.password = passwordHashed;
    await seller.save();

    return { status: true, message: "Account has been changed password!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const createSeller = async (seller) => {
  try {
    const existedSeller = await Seller.findOne({
      email: seller.email,
    }).lean();
    if (existedSeller) {
      if (existedSeller.isDelete)
        return {
          status: false,
          message: "Account has been existed but is in deleted state!",
        };
      return { status: false, message: "Account has been existed!" };
    }

    const passwordHashed = await bcrypt.bcryptHash(seller.password);
    seller.password = passwordHashed;
    seller.createAt = new Date();
    await Seller.create(seller);

    return { status: true, message: "Account created successfully!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteSeller = async (id) => {
  try {
    const seller = await Seller.findOne({
      _id: id,
      isDelete: false,
    });

    if (!seller)
      return {
        status: false,
        message: "Account does not exist or has already been deleted!",
      };

    seller.isDelete = true;
    await seller.save();

    return { status: true, message: "Account has been deleted!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getSellerById = async (id) => {
  try {
    const seller = await Seller.findOne({ _id: id, isDelete: false })
      .select("-password")
      .lean();
    if (!seller) return { status: false, message: "Seller does not exist!" };

    return { status: true, message: "Get seller successfully!", data: seller };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getSellerList = async (page, limit, filters) => {
  try {
    const totalCountPromise = Seller.countDocuments(filters);

    let sellerListPromise;
    if (page === 0 || limit === 0)
      sellerListPromise = Seller.find(filters).select("-password").lean();
    else
      sellerListPromise = Seller.find(filters)
        .select("-password")
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    const [totalCount, sellerList] = await Promise.all([
      totalCountPromise,
      sellerListPromise,
    ]);

    return {
      message: `Get seller list by limit: ${limit}, page: ${page} successfully!`,
      page,
      limit,
      totalCount,
      data: sellerList,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateSeller = async (id, seller) => {
  try {
    const existedSeller = await Seller.findOne({
      _id: id,
      isDelete: false,
    }).select("-password");
    if (!existedSeller)
      return { status: false, message: "Seller doesn't exist!" };

    Object.assign(existedSeller, seller);
    const updatedSeller = await existedSeller.save();

    return {
      status: true,
      message: "Seller updated successfully",
      data: updatedSeller,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  changePassword,
  createSeller,
  deleteSeller,
  getSellerById,
  getSellerList,
  updateSeller,
};
