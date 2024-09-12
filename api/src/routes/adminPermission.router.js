const express = require("express");
const router = express.Router();
const { dataValidate, paramsValidate } = require("../helpers/validator");
const {
  adminPermissionCreateSchema,
  adminPermissionUpdateSchema,
} = require("../models/schemas/adminPermission.schema");
const { idSchema } = require("../models/schemas/id.schema");
const adminPermissionController = require("../controllers/adminPermission.controller");

router
  .route("/create")
  .post(
    dataValidate(adminPermissionCreateSchema),
    adminPermissionController.createAdminPermission
  );

router
  .route("/delete/:id")
  .delete(
    paramsValidate(idSchema),
    adminPermissionController.deleteAdminPermission
  );

router.route("/get-list").get(adminPermissionController.getAdminPermissionList);

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(adminPermissionUpdateSchema),
    adminPermissionController.updateAdminPermission
  );

router
  .route("/:id")
  .get(
    paramsValidate(idSchema),
    adminPermissionController.getAdminPermissionById
  );

module.exports = router;
