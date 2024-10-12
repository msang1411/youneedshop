const { model, Schema } = require("mongoose");

const DistrictSchema = new Schema(
  {
    _id: false,
    idDistrict: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    idProvince: {
      type: String,
      required: true,
      ref: "province",
    },
  },
  {
    collection: "district",
  }
);

const District = model("district", DistrictSchema);
module.exports = District;
