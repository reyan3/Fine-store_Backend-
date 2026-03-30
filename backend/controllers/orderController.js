import orderModel from "../models/Order.js";
import productModel from "../models/product.js";
import cartModel from "../models/Cart.js";
import { sendOrderConfirmEmail } from "../utils/sendEmail.js";

export const placeOrder = async (req, res) => {
  const { userId, address } = req.body;

  //   Get cart
  const cart = await cartModel.findOne({ userId }).populate("items.productId");

  if (!cart) {
    res.json({ msg: "Cart is Empty..." });
  }

  //   Prepare order items
  const orderItems = cart.items.map((i) => ({
    productId: i.productId._id,
    quantity: i.quantity,
    price: i.productId.price,
  }));

  //   Calculate totalAmount
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  //   Deduct stock from products
  for (const i of cart.items) {
    await productModel.findByIdAndUpdate(i.productId._id, {
      $inc: { stock: -i.quantity },
    });
  }

  //   Create Order
  const order = new orderModel({
    userId,
    items: orderItems,
    address,
    totalAmount,
    paymentMethod: "COD",
  });
  await order.save();

  try {
    await sendOrderConfirmEmail(
      order.address.email,
      order._id.toString(),
      order.totalAmount,
    );
  } catch (err) {
    console.error("Error occurred", err.message);
  }

  //   clear cart
  await cartModel.findOneAndUpdate({ userId }, { items: [] });

  res.json({
    msg: "Order Placed Successfully!",
    order,
  });
};

export const getOrders = async (req, res) => {
  const { userId } = req.params;
  // .populate("items.productId") is crucial to get the product name/image
  const data = await orderModel
    .find({ userId })
    .populate("items.productId")
    .sort({ createdAt: -1 });

  if (!data || data.length === 0) {
    return res.status(200).json([]); // Return empty array if no orders
  }
  res.json(data);
};
