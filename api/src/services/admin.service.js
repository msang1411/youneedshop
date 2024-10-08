const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Admin = require("../models/Admin");
const AdminPosition = require("../models/AdminPosition");
const AdminRole = require("../models/AdminRole");
const AdminPermission = require("../models/AdminPermission");
const bcrypt = require("../helpers/bcrypt");

const createAdmin = async (admin) => {
  try {
    const existedAdmin = await Admin.findOne({
      email: admin.email,
    }).lean();
    if (existedAdmin) {
      if (existedAdmin.isDelete)
        return {
          status: false,
          message: "Account has been existed but is in deleted state!",
        };
      return { status: false, message: "Account has been existed!" };
    }

    if (admin.positions && admin.positions.length > 0) {
      const checkPositions = await AdminPosition.find({
        _id: { $in: admin.positions },
      }).lean();
      if (checkPositions.length !== admin.positions.length)
        return { status: false, message: "Some position IDs do not exist!" };
    }

    if (admin.roles && admin.roles.length > 0) {
      const checkRoles = await AdminRole.find({
        _id: { $in: admin.roles },
      }).lean();
      if (checkRoles.length !== admin.roles.length)
        return { status: false, message: "Some role IDs do not exist!" };
    }

    if (admin.permissions && admin.permissions.length > 0) {
      const checkPermissions = await AdminPermission.find({
        _id: { $in: admin.permissions },
      }).lean();
      if (checkPermissions.length !== admin.permissions.length)
        return { status: false, message: "Some permission IDs do not exist!" };
    }

    const passwordHashed = await bcrypt.bcryptHash(admin.password);
    admin.password = passwordHashed;
    admin.createAt = new Date();
    await Admin.create(admin);

    return { status: true, message: "Account created successfully!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteAdmin = async (id) => {
  try {
    const admin = await Admin.findOne({
      _id: id,
      isDelete: false,
    });

    if (!admin)
      return {
        status: false,
        message: "Account does not exist or has already been deleted!",
      };

    admin.isDelete = true;
    await admin.save();

    return { status: true, message: "Account has been deleted!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminById = async (id) => {
  try {
    const admin = await Admin.findOne({ _id: id, isDelete: false })
      .select("-password")
      .populate({
        path: "positions",
        model: "admin_position",
      })
      .populate({
        path: "roles",
        model: "admin_role",
      })
      .populate({
        path: "permissions",
        model: "admin_permission",
      })
      .lean();
    if (!admin) return { status: false, message: "Admin does not exist!" };

    return { status: true, message: "Get admin successfully!", data: admin };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminList = async (page, limit, filters) => {
  try {
    const totalCountPromise = Admin.countDocuments(filters);

    let adminListPromise;
    if (page === 0 || limit === 0)
      adminListPromise = Admin.find(filters)
        .select("-password")
        .populate({
          path: "positions",
          model: "admin_position",
        })
        .populate({
          path: "roles",
          model: "admin_role",
        })
        .populate({
          path: "permissions",
          model: "admin_permission",
        })
        .lean();
    else
      adminListPromise = Admin.find(filters)
        .select("-password")
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
          path: "positions",
          model: "admin_position",
        })
        .populate({
          path: "roles",
          model: "admin_role",
        })
        .populate({
          path: "permissions",
          model: "admin_permission",
        })
        .lean();

    const [totalCount, adminList] = await Promise.all([
      totalCountPromise,
      adminListPromise,
    ]);

    return {
      message: `Get admin list by limit: ${limit}, page: ${page} successfully!`,
      page,
      limit,
      totalCount,
      data: adminList,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateAdmin = async (id, admin) => {
  try {
    const existedAdmin = await Admin.findOne({
      _id: id,
      isDelete: false,
    }).select("-password");
    if (!existedAdmin)
      return { status: false, message: "Admin doesn't exist!" };

    if (admin.positions && admin.positions.length > 0) {
      const checkPositions = await AdminPosition.find({
        _id: { $in: admin.positions },
      }).lean();
      if (checkPositions.length !== admin.positions.length)
        return { status: false, message: "Some position IDs do not exist!" };
    }

    if (admin.roles && admin.roles.length > 0) {
      const checkRoles = await AdminRole.find({
        _id: { $in: admin.roles },
      }).lean();
      if (checkRoles.length !== admin.roles.length)
        return { status: false, message: "Some role IDs do not exist!" };
    }

    if (admin.permissions && admin.permissions.length > 0) {
      const checkPermissions = await AdminPermission.find({
        _id: { $in: admin.permissions },
      }).lean();
      if (checkPermissions.length !== admin.permissions.length)
        return { status: false, message: "Some permission IDs do not exist!" };
    }

    Object.assign(existedAdmin, admin);
    const updatedAdmin = await existedAdmin.save();

    const populatedAdmin = await Admin.findById(updatedAdmin._id)
      .populate({
        path: "positions",
        model: "admin_position",
      })
      .populate({
        path: "roles",
        model: "admin_role",
      })
      .populate({
        path: "permissions",
        model: "admin_permission",
      })
      .select("-password")
      .lean();

    return {
      status: true,
      message: "Admin updated successfully",
      data: populatedAdmin,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAdminList,
  updateAdmin,
};
