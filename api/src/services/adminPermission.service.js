const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const AdminPermission = require("../models/AdminPermission");
const Admin = require("../models/Admin");
const AdminRole = require("../models/AdminRole");

const createAdminPermission = async (permission) => {
  try {
    const existedAdminPermission = await AdminPermission.findOne({
      $or: [{ name: permission.name }, { code: permission.code }],
    });
    if (existedAdminPermission) {
      if (existedAdminPermission.isDelete)
        return {
          status: false,
          message:
            "Permission with this name or code already exists but is in deleted state!",
        };
      return {
        status: false,
        message: "Permission with this name or code already exists.",
      };
    }

    permission.createAt = new Date();
    permission.isDelete = false;
    await AdminPermission.create(permission);

    return { status: true, message: "Permission created successfully!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteAdminPermission = async (id) => {
  try {
    const permission = await AdminPermission.findOne({
      _id: id,
      isDelete: false,
    });

    if (!permission)
      return {
        status: false,
        message: "Permission does not exist or has already been deleted!",
      };

    const deletePermissionAdminPromise = Admin.updateMany(
      { permissions: id },
      { $pull: { permissions: id } }
    );
    const deletePermissionRolePromise = AdminRole.updateMany(
      { permissions: id },
      { $pull: { permissions: id } }
    );

    await Promise.all([
      deletePermissionAdminPromise,
      deletePermissionRolePromise,
    ]);

    permission.isDelete = true;
    await permission.save();

    return { status: true, message: "Permission has been deleted!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminPermissionById = async (id) => {
  try {
    const permission = await AdminPermission.findOne({
      _id: id,
      isDelete: false,
    }).lean();
    if (!permission)
      return { status: false, message: "Permission does not exist!" };

    return {
      status: true,
      message: "Get Permission successfully!",
      data: permission,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminPermissionList = async () => {
  try {
    const adminPermissionList = await AdminPermission.find({
      isDelete: false,
    }).lean();

    return {
      message: `Get permission list successfully!`,
      data: adminPermissionList,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateAdminPermission = async (id, permission) => {
  try {
    const existedAdminPermission = await AdminPermission.findOne({
      _id: id,
      isDelete: false,
    });
    if (!existedAdminPermission)
      return { status: false, message: "Permission doesn't exist!" };

    Object.assign(existedAdminPermission, permission);
    const updatedAdminPermission = await existedAdminPermission.save();

    const populatedAdmin = await AdminPermission.findById(
      updatedAdminPermission._id
    ).lean();

    return {
      status: true,
      message: "Permission updated successfully",
      data: populatedAdmin,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createAdminPermission,
  deleteAdminPermission,
  getAdminPermissionById,
  getAdminPermissionList,
  updateAdminPermission,
};
