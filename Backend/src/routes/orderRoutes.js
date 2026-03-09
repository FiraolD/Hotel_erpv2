import express from "express"
import {
 createOrder,
 getOrders,
 updateOrderStatus
} from "../controllers/orderController.js"

import { authenticateToken, optionalAuth } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", authenticateToken, getOrders)

router.post("/", optionalAuth, createOrder)

router.put("/:id", authenticateToken, updateOrderStatus)

export default router
