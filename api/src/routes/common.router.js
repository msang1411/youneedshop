const express = require("express");
const router = express.Router();
const commonController = require("../controllers/common.controller");
const importDataMiddleware = require("../middlewares/importDataMiddleware");
// const { verifyAccessToken } = require("../authentication/authentication");

router
  .route("/import-provinces-and-districts")
  .post(importDataMiddleware, commonController.importDataProvincesAndDistrict);

module.exports = router;
