const { model, Schema } = require("mongoose");

const AddressSchema = new Schema({
  _id: false,
  province: {
    type: String,
    required: true,
    ref: "province",
  },
  district: {
    type: String,
    required: true,
    ref: "district",
  },
  detail: {
    type: String,
    required: true,
  },
});

const SellerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    avatarId: {
      type: String,
    },
    backgroundURL: {
      type: String,
    },
    backgroundId: {
      type: String,
    },
    nationalId: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    address: {
      type: AddressSchema,
      required: true,
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
    collection: "seller",
  }
);

SellerSchema.pre("save", function (next) {
  // Update updateAt field to current timestamp
  if (!this.isNew) {
    if (this.isModified("isDelete") && this.isDelete)
      this.deleteAt = new Date();
    else this.updateAt = new Date();
  }
  next();
});

const Seller = model("seller", SellerSchema);
module.exports = Seller;
