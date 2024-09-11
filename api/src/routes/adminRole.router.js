const express = require("express");
const router = express.Router();
const { dataValidate, paramsValidate } = require("../helpers/validator");
const {
  adminRoleCreateSchema,
  adminRoleUpdateSchema,
} = require("../models/schemas/adminRole.schema");
const { idSchema } = require("../models/schemas/id.schema");
const adminRoleController = require("../controllers/adminRole.controller");

router
  .route("/create")
  .post(
    dataValidate(adminRoleCreateSchema),
    adminRoleController.createAdminRole
  );

router
  .route("/delete/:id")
  .delete(paramsValidate(idSchema), adminRoleController.deleteAdminRole);

router.route("/get-list").get(adminRoleController.getAdminRoleList);

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(adminRoleUpdateSchema),
    adminRoleController.updateAdminRole
  );

router
  .route("/:id")
  .get(paramsValidate(idSchema), adminRoleController.getAdminRoleById);

module.exports = router;
