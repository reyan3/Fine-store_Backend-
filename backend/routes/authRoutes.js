import express from "express";
import { signUpUser, loginUser , googleLogin , deleteAcc } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// router for signup
router.post("/signup", signUpUser);

// router for simple login
router.post("/login" ,  loginUser);

// router for googleLogin
router.post("/googlelogin", googleLogin);

// delete Account
router.delete("/delete/:id"  , verifyToken ,  deleteAcc)

export default router;
