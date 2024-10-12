const statusCode = require("../utils/statusCode");
const commonService = require("../services/common.service");

const importDataProvincesAndDistrict = async (req, res, next) => {
  if (!req.file) return res.status(statusCode.BAD_REQUEST, "No file uploaded");

  try {
    const jsonData = JSON.parse(req.file.buffer.toString());

    const result = await commonService.importDataProvincesAndDistrict(jsonData);
    return res.status(statusCode.CREATED).json({
      message: result.message,
      error: result.error,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  importDataProvincesAndDistrict,
};
