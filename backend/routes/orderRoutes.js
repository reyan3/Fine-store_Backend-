import express from "express";
import { getOrders, placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);

router.get("/getorder/:userId" , getOrders)

export default router;
