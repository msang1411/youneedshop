const Joi = require("joi");
const { addressSchema, addressFillterSchema } = require("./address.schema");

const sellerChangePassword = Joi.object().keys({
  newPassword: Joi.string().min(8).max(32).required(),
});

const sellerCreateSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(32).required(),
  name: Joi.string().trim().required(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .message(
      "Incorrect phone number format (have 8 - 15 number and '+' is first)"
    )
    .required(),
  avatarURL: Joi.string().uri().optional(),
  backgroundURL: Joi.string().uri().optional(),
  nationalId: Joi.string()
    .pattern(/^\d{9}$|^\d{12}$/)
    .message("National ID invalid")
    .required(),
  address: addressSchema.required(),
});

const sellerFiltersSchema = Joi.object().keys({
  email: Joi.string().lowercase().email().optional(),
  name: Joi.string().trim().optional(),
  phone: Joi.string().optional(),
  nationalId: Joi.string().optional(),
  address: addressFillterSchema.optional(),
});

const sellerUpdateSchema = Joi.object().keys({
  email: Joi.string().lowercase().email().optional(),
  name: Joi.string().trim().optional(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .message(
      "Incorrect phone number format (have 8 - 15 number and '+' is first)"
    )
    .optional(),
  avatarURL: Joi.string().uri().optional(),
  backgroundURL: Joi.string().uri().optional(),
  nationalId: Joi.string()
    .pattern(/^\d{9}$|^\d{12}$/)
    .message("National ID invalid")
    .optional(),
  address: addressSchema.optional(),
  isActive: Joi.boolean().optional(),
});

module.exports = {
  sellerChangePassword,
  sellerCreateSchema,
  sellerFiltersSchema,
  sellerUpdateSchema,
};
