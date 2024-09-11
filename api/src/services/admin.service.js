const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Admin = require("../models/Admin");
const bcrypt = require("../helpers/bcrypt");

const createAdmin = async (admin) => {
  try {
    const existedAdmin = await Admin.findOne({
      email: admin.email,
    });
    if (existedAdmin) {
      if (existedAdmin.isDelete)
        return {
          status: false,
          message: "Account has been existed but is in deleted state!",
        };
      return { status: false, message: "Account has been existed!" };
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
        select: "name",
      })
      .populate({
        path: "roles",
        model: "admin_role",
        select: "name",
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
          select: "name",
        })
        .populate({
          path: "roles",
          model: "admin_role",
          select: "name",
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
          select: "name",
        })
        .populate({
          path: "roles",
          model: "admin_role",
          select: "name",
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

    Object.assign(existedAdmin, admin);
    const updatedAdmin = await existedAdmin.save();

    const populatedAdmin = await Admin.findById(updatedAdmin._id)
      .populate({
        path: "positions",
        model: "admin_position",
        select: "name",
      })
      .populate({
        path: "roles",
        model: "admin_role",
        select: "name",
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
