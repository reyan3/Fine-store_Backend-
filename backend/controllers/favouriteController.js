import favouriteModel from "../models/Favourite.js";

// If favourite of product -> remove
// If not add product to favourite
export const toggleFavourite = async (req, res) => {
  const { userId, productId } = req.body;

  const existing = await favouriteModel.findOne({ userId, productId });

  if (existing) {
    await favouriteModel.deleteOne({ _id: existing._id });
    return res.json({ msg: "Removed from favorites"});
  } else {
    await favouriteModel.create({ userId, productId });
    return res.json({ msg: "Added to favorites" });
  }
};


// Get favourite products
export const getFavourite = async(req , res)=>{
    const { userId } = req.params;
    const favorites = await favouriteModel.find({ userId }).populate('productId');
    res.json(favorites);
}