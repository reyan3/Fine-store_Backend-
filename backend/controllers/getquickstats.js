import orderModel from "../models/Order.js";
import favouriteModel from "../models/Favourite.js";

export const getquickStats = async (req, res) => {
  const { userId } = req.params;

  const countOrder = await orderModel.countDocuments({ userId: userId });
  const countFavourite = await favouriteModel.countDocuments({ userId: userId });

  res.json({ countOrder, countFavourite });
};
