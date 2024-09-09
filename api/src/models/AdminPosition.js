const { model, Schema } = require("mongoose");

const AdminPositionSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
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
  },
  {
    collection: "admin_position",
  }
);

AdminPositionSchema.pre("save", function (next) {
  // Update updateAt field to current timestamp
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete)
      this.deleteAt = new Date();
    else this.updateAt = new Date();
  }
  next();
});

const AdminPosition = model("admin_position", AdminPositionSchema);
module.exports = AdminPosition;
