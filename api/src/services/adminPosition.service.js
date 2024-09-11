const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const AdminPosition = require("../models/AdminPosition");
const Admin = require("../models/Admin");

const createAdminPosition = async (position) => {
  try {
    const existedAdminPosition = await AdminPosition.findOne({
      name: position.name,
    });
    if (existedAdminPosition) {
      if (existedAdminPosition.isDelete)
        return {
          status: false,
          message: "Position has been existed but is in deleted state!",
        };
      return { status: false, message: "Position has been existed!" };
    }

    position.createAt = new Date();
    position.isDelete = false;
    await AdminPosition.create(position);

    return { status: true, message: "Position created successfully!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteAdminPosition = async (id) => {
  try {
    const position = await AdminPosition.findOne({
      _id: id,
      isDelete: false,
    });

    if (!position)
      return {
        status: false,
        message: "Position does not exist or has already been deleted!",
      };

    const checkAdminUsing = await Admin.findOne({
      positions: id,
      isDelete: false,
    }).lean();

    if (checkAdminUsing)
      return {
        status: false,
        message: "Position having admin use!",
      };

    position.isDelete = true;
    await position.save();

    return { status: true, message: "Position has been deleted!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminPositionById = async (id) => {
  try {
    const position = await AdminPosition.findOne({
      _id: id,
      isDelete: false,
    }).lean();
    if (!position)
      return { status: false, message: "Position does not exist!" };

    return {
      status: true,
      message: "Get position successfully!",
      data: position,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminPositionList = async () => {
  try {
    const adminPositionList = await AdminPosition.find({
      isDelete: false,
    }).lean();

    return {
      message: `Get position list successfully!`,
      data: adminPositionList,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateAdminPosition = async (id, position) => {
  try {
    const existedAdminPosition = await AdminPosition.findOne({
      _id: id,
      isDelete: false,
    });
    if (!existedAdminPosition)
      return { status: false, message: "Position doesn't exist!" };

    Object.assign(existedAdminPosition, position);
    const updatedAdminPosition = await existedAdminPosition.save();

    return {
      status: true,
      message: "Position updated successfully",
      data: updatedAdminPosition,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createAdminPosition,
  deleteAdminPosition,
  getAdminPositionById,
  getAdminPositionList,
  updateAdminPosition,
};
