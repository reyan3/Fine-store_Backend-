import {
  submitHelpForm,
} from "../controllers/helpController.js";
import express from "express";

const router = express.Router();

// submit the help form
router.post("/submit", submitHelpForm);

export default router;
