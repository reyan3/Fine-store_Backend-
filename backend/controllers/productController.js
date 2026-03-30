import productModel from "../models/product.js";

// Create New Product
export const createProd = async (req, res) => {
  const product = new productModel(req.body);
  const resProduct = await product.save();
  res.json({
    msg: "Product Created Successfully!",
    product: resProduct,
  });
};

// Get all products
export const getProd = async (req, res) => {
  const { search, category } = req.query;

  let filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
    //case insensitive
  }

  if(category){
    filter.category = category
  }

  const products = await productModel.find(filter).sort({ createdAt: -1 }); //descending
  res.json({
    products,
  });
};

// Update a product
export const updateProd = async (req, res) => {
  const updated = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );
  res.json({
    msg: "Updation Successfull!",
    updated,
  });
};

// Delete a product
export const deleteProd = async (req, res) => {
  await productModel.findByIdAndDelete(req.params.id);
  res.json({
    msg: "Deletion of Product Completed!",
  });
};
