import express from "express"
import {
 getInventory,
 addInventoryItem,
 updateInventory
} from "../controllers/inventoryController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.get("/", authenticateToken, getInventory)

router.post(
 "/",
 authenticateToken,
 authorizeRoles("admin", "manager"),
 addInventoryItem
)

router.put("/:id", authenticateToken, updateInventory)

export default router