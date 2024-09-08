const Joi = require("joi");

const paginationSchema = Joi.object({
  limit: Joi.number().integer().min(0).default(10),
  page: Joi.number().integer().min(0).default(1),
});

module.exports = {
  paginationSchema,
};
