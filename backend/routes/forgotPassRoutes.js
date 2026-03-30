import express from "express";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/forgotPassController.js";

const router = express.Router();

// for sending link to user by clicking forgot
router.post("/submit", forgotPassword);

// main route for reset password
router.put("/resetpass/:id/:token", resetPassword);

export default router;
