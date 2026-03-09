import express from "express"
import { getMenu, createMenuItem } from "../controllers/menuController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.get("/", getMenu)

router.post(
 "/",
 authenticateToken,
 authorizeRoles("admin", "manager"),
 createMenuItem
)

export default router