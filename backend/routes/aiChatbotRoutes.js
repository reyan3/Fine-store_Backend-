import express from "express";
import { aiChatbot } from "../controllers/aiChatbotController.js";

const router = express.Router();

router.post("/chatbot", aiChatbot);

export default router;
