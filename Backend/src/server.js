import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"
import reservationRoutes from "./routes/reservationRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import menuRoutes from "./routes/menuRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import inventoryRoutes from "./routes/inventoryRoutes.js"
import financeRoutes from "./routes/financeRoutes.js"
import housekeepingRoutes from "./routes/housekeepingRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import emailRoutes from './routes/emailRoutes.js'










dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/menu", menuRoutes)
app.use("/api/rooms", roomRoutes)
app.use("/api/reservations", reservationRoutes)
app.use("/api/finance", financeRoutes)
app.use("/api/housekeeping", housekeepingRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use('/api/email', emailRoutes)


app.get("/", (req, res) => {
  res.json({ message: "Hotel ERP v2 API running" })
})

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT)
})