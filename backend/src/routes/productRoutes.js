import express from "express";
import { getMyProducts } from "../controllers/productController.js";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyFarmer } from "../middleware/farmerMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/my", verifyToken, verifyFarmer, getMyProducts);

router.post("/", verifyToken, verifyFarmer, upload.single("image"), addProduct);

router.put("/:id", verifyToken, verifyFarmer, updateProduct);

router.delete("/:id", verifyToken, verifyFarmer, deleteProduct);

export default router;
