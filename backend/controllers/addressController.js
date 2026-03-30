import addressModel from "../models/Address.js";

// Save Address
export const saveAddress = async (req, res) => {
  const address = new addressModel(req.body);
  await address.save();
  res.json({
    msg: "Address Saved Successfully!",
    address,
  });
};

// get addresses using userId
export const getAddresses = async (req, res) => {
  const addresses = await addressModel.find({ userId: req.params.userId });
  res.json(addresses);
};

export const deleteAddresses = async (req, res) => {
  const { id } = req.params;
  const addresses = await addressModel.findByIdAndDelete(id);
  res.json({
    msg:"Address Deleted Completed!",
    addresses
  });
};
