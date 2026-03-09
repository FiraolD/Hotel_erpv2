import express from "express"
import {
 createInvoice,
 recordPayment,
 getRevenueReport
} from "../controllers/financeController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post(
 "/invoice",
 authenticateToken,
 authorizeRoles("admin","manager"),
 createInvoice
)

router.post(
 "/payment",
 authenticateToken,
 recordPayment
)

router.get(
 "/report",
 authenticateToken,
 authorizeRoles("admin"),
 getRevenueReport
)

export default router