const multer = require("multer");
const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");

const storage = multer.memoryStorage();

const importData = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/json") cb(null, true);
    else {
      req.fileValidationError = "JSON format of the file is only accepted";
      cb(null, false);
    }
  },
}).single("file");

const importDataMiddleware = (req, res, next) => {
  importData(req, res, (err) => {
    if (!req.file)
      return next(
        new ApiError(
          statusCode.BAD_REQUEST,
          "No file uploaded. Please upload a JSON file."
        )
      );
    if (err) return next(new ApiError(statusCode.BAD_REQUEST, err.message));
    if (req.fileValidationError)
      return next(
        new ApiError(statusCode.BAD_REQUEST, req.fileValidationError)
      );

    next();
  });
};

module.exports = importDataMiddleware;
