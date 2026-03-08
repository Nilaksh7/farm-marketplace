import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addToCart);

router.get("/", verifyToken, getCart);

router.delete("/:id", verifyToken, removeFromCart);

router.put("/update", verifyToken, updateCartQuantity);

export default router;
