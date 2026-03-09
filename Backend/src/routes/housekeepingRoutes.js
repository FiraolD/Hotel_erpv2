import express from "express"
import {
 createTask,
 getTasks,
 updateTaskStatus
} from "../controllers/housekeepingController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", authenticateToken, getTasks)

router.post("/", authenticateToken, createTask)

router.put("/:id", authenticateToken, updateTaskStatus)

export default router