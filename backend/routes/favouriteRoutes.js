import {
  toggleFavourite,
  getFavourite,
} from "../controllers/favouriteController.js";
import express from "express";

const router = express.Router();


// Create/delete favourites
router.post("/toggle", toggleFavourite);

// Get the Favourites
router.get("/:userId", getFavourite);

export default router;
