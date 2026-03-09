import express from "express"
import {
 createReservation,
 getReservations
} from "../controllers/reservationController.js"

import { authenticateToken, optionalAuth } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", authenticateToken, getReservations)

router.post("/", optionalAuth, createReservation)

export default router
