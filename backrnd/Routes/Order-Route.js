import express from "express";
import { createOrder, getUserOrders } from "../Controllers/Order-Contr.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/user", authMiddleware, getUserOrders);

export default router;
