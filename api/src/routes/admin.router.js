const express = require("express");
const router = express.Router();
const {
  dataValidate,
  // filtersValidate,
  // paramsValidate,
  // queryValidate,
} = require("../helpers/validator");
const {
  adminCreateSchema,
  // adminFiltersSchema,
  // adminUpdateSchema,
} = require("../models/schemas/admin.schemas");
const adminController = require("../controllers/admin.controller");

router
  .route("/create")
  .post(dataValidate(adminCreateSchema), adminController.createAdmin);

module.exports = router;
