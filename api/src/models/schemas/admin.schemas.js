const Joi = require("joi");

const adminCreateSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(32).required(),
  name: Joi.string().trim().required(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .message(
      "Incorrect phone number format (have 8 - 15 number and '+' is first)"
    )
    .optional(),
  avatarURL: Joi.string().uri().optional(),
  nationalId: Joi.string()
    .pattern(/^\d{9}$|^\d{12}$/)
    .message("National ID invalid")
    .optional(),
  birth: Joi.date().iso().less("now").optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  isActive: Joi.boolean().default(false),
  isRetired: Joi.boolean().default(false),
  createAt: Joi.date().default(Date.now),
  updateAt: Joi.date().optional(),
  isDelete: Joi.boolean().default(false),
  deleteAt: Joi.date().iso().less("now").optional(),
  positions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  roles: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const adminFiltersSchema = Joi.object().keys({
  email: Joi.string().lowercase().email().optional(),
  name: Joi.string().trim().optional(),
  phone: Joi.string().optional(),
  nationalId: Joi.string().optional(),
  gender: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  isRetired: Joi.boolean().default(false),
  isDelete: Joi.boolean().default(false),
  positionId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  roleId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  permissionId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
});

const adminUpdateSchema = Joi.object().keys({
  email: Joi.string().lowercase().email().optional(),
  name: Joi.string().trim().optional(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .message(
      "Incorrect phone number format (have 8 - 15 number and '+' is first)"
    )
    .optional(),
  avatarURL: Joi.string().uri().optional(),
  nationalId: Joi.string()
    .pattern(/^\d{9}$|^\d{12}$/)
    .message("National ID invalid")
    .optional(),
  birth: Joi.date().iso().less("now").optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
  isActive: Joi.boolean().optional(),
  isRetired: Joi.boolean().optional(),
  positions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  roles: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const adminChangePassword = Joi.object().keys({
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().min(8).max(32).required(),
});

module.exports = {
  adminCreateSchema,
  adminFiltersSchema,
  adminUpdateSchema,
  adminChangePassword,
};
