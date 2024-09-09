const express = require("express");
const router = express.Router();
const {
  dataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
} = require("../helpers/validator");
const {
  adminCreateSchema,
  adminFiltersSchema,
  adminUpdateSchema,
} = require("../models/schemas/admin.schemas");
const { idSchema } = require("../models/schemas/id.schema");
const { paginationSchema } = require("../models/schemas/pagination.scheme");
const adminController = require("../controllers/admin.controller");

router
  .route("/create")
  .post(dataValidate(adminCreateSchema), adminController.createAdmin);

router
  .route("/delete/:id")
  .delete(paramsValidate(idSchema), adminController.deleteAdmin);

router
  .route("/get-list")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(adminFiltersSchema),
    adminController.getAdminList
  );

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(adminUpdateSchema),
    adminController.updateAdmin
  );

router
  .route("/:id")
  .get(paramsValidate(idSchema), adminController.getAdminById);

module.exports = router;
