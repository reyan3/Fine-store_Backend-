import express from "express";
import { saveAddress, getAddresses, deleteAddresses } from "../controllers/addressController.js";

const router = express.Router();

router.post("/add", saveAddress);

router.get("/:userId", getAddresses);

router.delete("/delete/:id" , deleteAddresses)

export default router;
