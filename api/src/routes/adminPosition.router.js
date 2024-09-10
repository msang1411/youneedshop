const express = require("express");
const router = express.Router();
const { dataValidate, paramsValidate } = require("../helpers/validator");
const {
  adminPositionCreateSchema,
  adminPositionUpdateSchema,
} = require("../models/schemas/adminPosition.schema");
const { idSchema } = require("../models/schemas/id.schema");
const adminPositionController = require("../controllers/adminPosition.controller");

router
  .route("/create")
  .post(
    dataValidate(adminPositionCreateSchema),
    adminPositionController.createAdminPosition
  );

router
  .route("/delete/:id")
  .delete(
    paramsValidate(idSchema),
    adminPositionController.deleteAdminPosition
  );

router.route("/get-list").get(adminPositionController.getAdminPositionList);

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(adminPositionUpdateSchema),
    adminPositionController.updateAdminPosition
  );

router
  .route("/:id")
  .get(paramsValidate(idSchema), adminPositionController.getAdminPositionById);

module.exports = router;
