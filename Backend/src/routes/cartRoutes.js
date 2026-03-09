import express from "express"
import { addToCart, getCart } from "../controllers/cartController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", authenticateToken, getCart)

router.post("/", authenticateToken, addToCart)

export default router