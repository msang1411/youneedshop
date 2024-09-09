const Joi = require("joi");

const adminPositionCreateSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  description: Joi.string().optional(),
  createAt: Joi.date().default(Date.now),
  updateAt: Joi.date().optional(),
  isDelete: Joi.boolean().default(false),
  deleteAt: Joi.date().iso().less("now").optional(),
});

const adminPositionUpdateSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  description: Joi.string().optional(),
});

module.exports = {
  adminPositionCreateSchema,
  adminPositionUpdateSchema,
};
