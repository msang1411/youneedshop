const Joi = require("joi");

const adminRoleCreateSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  description: Joi.string().optional(),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const adminRoleUpdateSchema = Joi.object().keys({
  name: Joi.string().trim().optional(),
  description: Joi.string().optional(),
  permissions: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

module.exports = {
  adminRoleCreateSchema,
  adminRoleUpdateSchema,
};
