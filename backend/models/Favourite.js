import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
});

favouriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

const favouriteModel = mongoose.model("favourites", favouriteSchema);

export default favouriteModel;
