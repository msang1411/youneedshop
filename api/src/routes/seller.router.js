const express = require("express");
const router = express.Router();
const {
  dataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
} = require("../helpers/validator");
const {
  sellerChangePassword,
  sellerCreateSchema,
  sellerFiltersSchema,
  sellerUpdateSchema,
} = require("../models/schemas/seller.schema");
const { idSchema } = require("../models/schemas/id.schema");
const { paginationSchema } = require("../models/schemas/pagination.schema");
const sellerController = require("../controllers/seller.controller");
// const { verifyAccessToken } = require("../authentication/authentication");

router
  .route("/change-password/:id")
  .post(
    paramsValidate(idSchema),
    dataValidate(sellerChangePassword),
    sellerController.changePassword
  );

router
  .route("/create")
  .post(dataValidate(sellerCreateSchema), sellerController.createSeller);

router
  .route("/delete/:id")
  .delete(paramsValidate(idSchema), sellerController.deleteSeller);

router
  .route("/get-list")
  .post(
    queryValidate(paginationSchema),
    filtersValidate(sellerFiltersSchema),
    sellerController.getSellerList
  );

router
  .route("/update/:id")
  .put(
    paramsValidate(idSchema),
    dataValidate(sellerUpdateSchema),
    sellerController.updateSeller
  );

router
  .route("/:id")
  .get(paramsValidate(idSchema), sellerController.getSellerById);

module.exports = router;
