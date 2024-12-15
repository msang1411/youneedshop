const statusCode = require("../utils/statusCode");
const sellerService = require("../services/seller.service");

const changePassword = async (req, res, next) => {
  try {
    const result = await sellerService.changePassword(
      req.value.params.id,
      req.value.data.newPassword
    );

    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const createSeller = async (req, res, next) => {
  try {
    const result = await sellerService.createSeller(req.value.data, req.file);

    if (!result.status)
      return res.status(statusCode.CONFLICT).json({
        message: result.message,
      });
    return res.status(statusCode.CREATED).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSeller = async (req, res, next) => {
  try {
    const result = await sellerService.deleteSeller(req.value.params.id);
    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.ACCEPTED).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const getSellerById = async (req, res, next) => {
  try {
    const result = await sellerService.getSellerById(req.value.params.id);

    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSellerList = async (req, res, next) => {
  try {
    const result = await sellerService.getSellerList(
      req.value.query.page,
      req.value.query.limit,
      req.value.filters
    );

    return res.status(statusCode.OK).json({
      message: result.message,
      page: result.page,
      limit: result.limit,
      totalCount: result.totalCount,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const result = await sellerService.updateAvatar(
      req.value.params.id,
      req.file
    );

    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateSeller = async (req, res, next) => {
  try {
    const result = await sellerService.updateSeller(
      req.value.params.id,
      req.value.data
    );

    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changePassword,
  createSeller,
  deleteSeller,
  getSellerById,
  getSellerList,
  updateAvatar,
  updateSeller,
};
