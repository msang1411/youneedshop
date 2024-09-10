const Joi = require("joi");

const adminPositionCreateSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  description: Joi.string().optional(),
});

const adminPositionUpdateSchema = Joi.object().keys({
  name: Joi.string().trim().optional(),
  description: Joi.string().optional(),
});

module.exports = {
  adminPositionCreateSchema,
  adminPositionUpdateSchema,
};
