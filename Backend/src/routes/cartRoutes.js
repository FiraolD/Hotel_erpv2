import express from "express"
import { addToCart, getCart } from "../controllers/cartController.js"
import { optionalAuth } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", optionalAuth, getCart)

router.post("/", optionalAuth, addToCart)

export default router
