import { getquickStats } from "../controllers/getquickstats.js";
import express from "express";

const router = express.Router();

router.get("/:userId", getquickStats);

export default router;
