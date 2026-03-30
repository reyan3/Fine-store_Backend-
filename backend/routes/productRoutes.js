import express from "express";
import {
  createProd,
  getProd,
  updateProd,
  deleteProd,
} from "../controllers/productController.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

// Create Product
router.post("/add", verifyToken,   createProd);
// authHandler middleware provide security

// Get all Products
router.get("/", getProd);

// Update Product
router.put("/update/:id", verifyToken ,  updateProd);

// Delete Product
router.delete("/delete/:id", verifyToken , deleteProd);

export default router;
