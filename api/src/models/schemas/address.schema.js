const Joi = require("joi");

const addressSchema = Joi.object({
  province: Joi.string().required(),
  district: Joi.string().required(),
  detail: Joi.string().required(),
});

const addressFillterSchema = Joi.object({
  province: Joi.string().optional(),
  district: Joi.string().optional(),
  detail: Joi.string().optional(),
});

module.exports = {
  addressSchema,
  addressFillterSchema,
};
