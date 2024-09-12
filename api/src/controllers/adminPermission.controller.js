const statusCode = require("../utils/statusCode");
const adminPermissionService = require("../services/adminPermission.service");

const createAdminPermission = async (req, res, next) => {
  try {
    const result = await adminPermissionService.createAdminPermission(
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

const deleteAdminPermission = async (req, res, next) => {
  try {
    const result = await adminPermissionService.deleteAdminPermission(
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

const getAdminPermissionById = async (req, res, next) => {
  try {
    const result = await adminPermissionService.getAdminPermissionById(
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

const getAdminPermissionList = async (req, res, next) => {
  try {
    const result = await adminPermissionService.getAdminPermissionList();

    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateAdminPermission = async (req, res, next) => {
  try {
    const result = await adminPermissionService.updateAdminPermission(
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
  createAdminPermission,
  deleteAdminPermission,
  getAdminPermissionById,
  getAdminPermissionList,
  updateAdminPermission,
};
