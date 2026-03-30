import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const productModel = mongoose.model("products", productSchema);

export default productModel;
