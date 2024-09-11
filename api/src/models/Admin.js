const { model, Schema, Types } = require("mongoose");

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    nationalId: {
      type: String,
    },
    birth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isRetired: {
      type: Boolean,
      default: false,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
    },
    positions: [
      {
        type: Types.ObjectId,
        require: true,
        ref: "admin_position",
      },
    ],
    roles: [
      {
        type: Types.ObjectId,
        ref: "admin_role",
      },
    ],
    permissions: [
      {
        type: Types.ObjectId,
        ref: "admin_permission",
      },
    ],
  },
  {
    collection: "admin",
  }
);

AdminSchema.pre("save", function (next) {
  // Update updateAt field to current timestamp
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete)
      this.deleteAt = new Date();
    else this.updateAt = new Date();
  }
  next();
});

const Admin = model("admin", AdminSchema);
module.exports = Admin;
