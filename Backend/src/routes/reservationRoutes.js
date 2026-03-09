import express from "express"
import {
 createReservation,
 getReservations
} from "../controllers/reservationController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", authenticateToken, getReservations)

router.post("/", authenticateToken, createReservation)

export default router