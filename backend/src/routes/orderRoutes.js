import express from "express";
import {
  createOrder,
  getOrders,
  getFarmerOrders,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyFarmer } from "../middleware/farmerMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);

router.get("/", verifyToken, getOrders);

router.get("/farmer", verifyToken, verifyFarmer, getFarmerOrders);

export default router;
