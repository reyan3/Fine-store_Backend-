import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    fullname: String,
    email: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
  },
  { timestamps: true },
);

const addressModel = mongoose.model("address", addressSchema);

export default addressModel;
