const Joi = require("joi");

const adminPermissionCreateSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  code: Joi.string().trim().required(),
  actions: Joi.array().min(1).required(),
  description: Joi.string().optional(),
});

const adminPermissionUpdateSchema = Joi.object().keys({
  name: Joi.string().trim().optional(),
  code: Joi.string().trim().optional(),
  actions: Joi.array().min(1).optional(),
  description: Joi.string().optional(),
});

module.exports = {
  adminPermissionCreateSchema,
  adminPermissionUpdateSchema,
};
