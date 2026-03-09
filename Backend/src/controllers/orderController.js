import prisma from "../config/prisma.js"
import { clearCart } from "./cartController.js"
import { getOrCreateGuestUserId } from "../utils/userUtils.js"

export const createOrder = async (req, res) => {

 try {
  const { total } = req.body

  if (typeof total !== "number") {
   return res.status(400).json({ message: "total is required" })
  }

  const userId = req.user?.id || await getOrCreateGuestUserId()

  const order = await prisma.order.create({
   data: {
    userId,
    total,
    status: "pending"
   }
  })

  clearCart(req)

  res.json(order)
 } catch (error) {
  res.status(500).json({ message: "Failed to create order", error: error.message })
 }
}

export const getOrders = async (_req, res) => {

 try {
  const orders = await prisma.order.findMany()
  res.json(orders)
 } catch (error) {
  res.status(500).json({ message: "Failed to fetch orders", error: error.message })
 }
}

export const updateOrderStatus = async (req, res) => {

 try {
  const { id } = req.params
  const { status } = req.body

  const order = await prisma.order.update({
   where: { id: Number(id) },
   data: { status }
  })

  res.json(order)
 } catch (error) {
  res.status(500).json({ message: "Failed to update order", error: error.message })
 }
}
