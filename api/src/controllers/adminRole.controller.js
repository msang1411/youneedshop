const statusCode = require("../utils/statusCode");
const adminRoleService = require("../services/adminRole.service");

const createAdminRole = async (req, res, next) => {
  try {
    const result = await adminRoleService.createAdminRole(req.value.data);

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

const deleteAdminRole = async (req, res, next) => {
  try {
    const result = await adminRoleService.deleteAdminRole(req.value.params.id);
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

const getAdminRoleById = async (req, res, next) => {
  try {
    const result = await adminRoleService.getAdminRoleById(req.value.params.id);

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

const getAdminRoleList = async (req, res, next) => {
  try {
    const result = await adminRoleService.getAdminRoleList();

    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateAdminRole = async (req, res, next) => {
  try {
    const result = await adminRoleService.updateAdminRole(
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
  createAdminRole,
  deleteAdminRole,
  getAdminRoleById,
  getAdminRoleList,
  updateAdminRole,
};
