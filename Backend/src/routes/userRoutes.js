import express from "express"
import { getUsers, createUser } from "../controllers/userController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.get("/", authenticateToken, authorizeRoles("admin"), getUsers)

router.post("/", authenticateToken, authorizeRoles("admin"), createUser)

export default router