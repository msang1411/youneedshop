const { model, Schema } = require("mongoose");

const ProvinceSchema = new Schema(
  {
    _id: false,
    idProvince: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "province",
  }
);

const Province = model("province", ProvinceSchema);
module.exports = Province;
