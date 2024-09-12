const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const AdminRole = require("../models/AdminRole");
const Admin = require("../models/Admin");
const AdminPermission = require("../models/AdminPermission");

const createAdminRole = async (role) => {
  try {
    const existedAdminRole = await AdminRole.findOne({
      name: role.name,
    }).lean();
    if (existedAdminRole) {
      if (existedAdminRole.isDelete)
        return {
          status: false,
          message: "Role has been existed but is in deleted state!",
        };
      return { status: false, message: "Role has been existed!" };
    }

    if (role.permissions && role.permissions.length > 0) {
      const checkPermissions = await AdminPermission.find({
        _id: { $in: role.permissions },
      }).lean();
      if (checkPermissions.length !== role.permissions.length)
        return { status: false, message: "Some permission IDs do not exist!" };
    }

    role.createAt = new Date();
    role.isDelete = false;
    await AdminRole.create(role);

    return { status: true, message: "Role created successfully!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteAdminRole = async (id) => {
  try {
    const role = await AdminRole.findOne({
      _id: id,
      isDelete: false,
    });

    if (!role)
      return {
        status: false,
        message: "Role does not exist or has already been deleted!",
      };

    const checkAdminUsing = await Admin.findOne({
      roles: id,
      isDelete: false,
    }).lean();

    if (checkAdminUsing)
      return {
        status: false,
        message: "Role having admin use!",
      };

    role.isDelete = true;
    await role.save();

    return { status: true, message: "Role has been deleted!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminRoleById = async (id) => {
  try {
    const role = await AdminRole.findOne({
      _id: id,
      isDelete: false,
    })
      .populate({
        path: "permissions",
        model: "admin_permission",
      })
      .lean();
    if (!role) return { status: false, message: "Role does not exist!" };

    return {
      status: true,
      message: "Get role successfully!",
      data: role,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminRoleList = async () => {
  try {
    const adminRoleList = await AdminRole.find({ isDelete: false })
      .populate({
        path: "permissions",
        model: "admin_permission",
      })
      .lean();

    return {
      message: `Get role list successfully!`,
      data: adminRoleList,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateAdminRole = async (id, role) => {
  try {
    const existedAdminRole = await AdminRole.findOne({
      _id: id,
      isDelete: false,
    });
    if (!existedAdminRole)
      return { status: false, message: "Role doesn't exist!" };

    Object.assign(existedAdminRole, role);
    const updatedAdminRole = await existedAdminRole.save();

    const populatedAdmin = await AdminRole.findById(updatedAdminRole._id)
      .populate({
        path: "permissions",
        model: "admin_permission",
      })
      .lean();

    return {
      status: true,
      message: "Role updated successfully",
      data: populatedAdmin,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createAdminRole,
  deleteAdminRole,
  getAdminRoleById,
  getAdminRoleList,
  updateAdminRole,
};
