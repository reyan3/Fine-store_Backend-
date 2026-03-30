import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: Number,
        price: Number,
      },
    ],
    address: {
      fullname: String,
      phone: String,
      email: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },
    totalAmount: Number,
    paymentMethod: {
      type: String,
      default: "COD",
    },
    status: {
      type: String,
      default: "placed",
    },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
