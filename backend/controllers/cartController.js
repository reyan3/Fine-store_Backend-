import cartModel from "../models/Cart.js";

// Add Item to cart
export const addtoCart = async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    cart = new cartModel({ userId, items: [{ productId, quantity: 1 }] });
  } else {
    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
  }
  await cart.save();
  res.json({
    msg: "Item added to cart",
    cart,
  });
};

// Remove item from cart
export const removeItem = async (req, res) => {
  const { userId, productId } = req.body;
  let cart = await cartModel.findOne({ userId });
  if (!cart) {
    res.status(404).json({
      msg: "Cart Not Found...",
    });
  } else {
    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
  }

  await cart.save();
  res.json({
    msg: "Item removed from cart",
    cart,
  });
};

// Update item in cart
export const updateItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  let cart = await cartModel.findOne({ userId });
  if (!cart) {
    res.json({ msg: "Cart Not Found" });
  } else {
    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
      res.json({ msg: "Item not found" });
    } else {
      item.quantity = quantity;
    }
  }
  await cart.save();
  res.json({ msg: "Item Updated!", cart });
};

// Get cart by userId
export const getCart = async (req, res) => {
  const { userId } = req.params;

  let cart = await cartModel.findOne({ userId }).populate("items.productId");

  res.json(cart);
};
