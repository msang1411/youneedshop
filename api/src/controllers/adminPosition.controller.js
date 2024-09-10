const statusCode = require("../utils/statusCode");
const adminPositionService = require("../services/adminPosition.service");

const createAdminPosition = async (req, res, next) => {
  try {
    const result = await adminPositionService.createAdminPosition(
      req.value.data
    );

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

const deleteAdminPosition = async (req, res, next) => {
  try {
    const result = await adminPositionService.deleteAdminPosition(
      req.value.params.id
    );
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

const getAdminPositionById = async (req, res, next) => {
  try {
    const result = await adminPositionService.getAdminPositionById(
      req.value.params.id
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

const getAdminPositionList = async (req, res, next) => {
  try {
    const result = await adminPositionService.getAdminPositionList();

    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateAdminPosition = async (req, res, next) => {
  try {
    const result = await adminPositionService.updateAdminPosition(
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
  createAdminPosition,
  deleteAdminPosition,
  getAdminPositionById,
  getAdminPositionList,
  updateAdminPosition,
};
