import express from "express";
import {
  addtoCart,
  removeItem,
  updateItem,
  getCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Add cart
router.post("/add", addtoCart);

// Remove cart
router.post("/remove", removeItem);

// Update cart
router.post("/update", updateItem);

// Get cart
router.get("/:userId", getCart);

export default router;
