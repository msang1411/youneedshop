const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Province = require("../models/Province");
const District = require("../models/District");

const importDataProvincesAndDistrict = async (jsonData) => {
  try {
    const { province, district } = jsonData;
    if (!province || !district)
      throw new ApiError(
        statusCode.BAD_REQUEST,
        "Invalid data structure: Province or District fields are incorrect"
      );

    const errorRecords = [];

    let countProvince = 0;
    for (const prov of province) {
      try {
        const { idProvince, name } = prov;

        if (
          !idProvince ||
          typeof idProvince !== "string" ||
          !name ||
          typeof name !== "string"
        ) {
          throw new Error(`Invalid province entry: ${JSON.stringify(prov)}`);
        }

        await Province.updateOne(
          { idProvince },
          { $set: { name } },
          { upsert: true }
        );

        countProvince++;
      } catch (error) {
        errorRecords.push(error.message);
      }
    }

    let countDistricts = 0;
    for (const dist of district) {
      try {
        const { idDistrict, idProvince, name } = dist;

        if (
          !idDistrict ||
          typeof idDistrict !== "string" ||
          !idProvince ||
          typeof idProvince !== "string" ||
          !name ||
          typeof name !== "string"
        ) {
          throw new Error(`Invalid district entry: ${JSON.stringify(dist)}`);
        }

        await District.updateOne(
          { idDistrict },
          { $set: { idProvince, name } },
          { upsert: true }
        );

        countDistricts++;
      } catch (error) {
        errorRecords.push(error.message);
      }
    }

    return {
      message:
        `imported successfully with ${countProvince} provinces and ${countDistricts} ` +
        `districts have been update or insert`,
      error: errorRecords.length > 0 ? errorRecords : [],
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  importDataProvincesAndDistrict,
};
