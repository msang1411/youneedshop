const statusCode = require("../utils/statusCode");
const adminService = require("../services/admin.service");

const createAdmin = async (req, res, next) => {
  try {
    const result = await adminService.createAdmin(req.value.data);

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

module.exports = {
  createAdmin,
};
