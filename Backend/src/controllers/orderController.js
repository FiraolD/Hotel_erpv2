import prisma from "../config/prisma.js"

export const createOrder = async (req, res) => {

 const { total } = req.body

 const order = await prisma.order.create({
  data: {
   userId: req.user.id,
   total,
   status: "pending"
  }
 })

 res.json(order)
}

export const getOrders = async (req, res) => {

 const orders = await prisma.order.findMany()

 res.json(orders)
}

export const updateOrderStatus = async (req, res) => {

 const { id } = req.params
 const { status } = req.body

 const order = await prisma.order.update({
  where: { id: Number(id) },
  data: { status }
 })

 res.json(order)
}