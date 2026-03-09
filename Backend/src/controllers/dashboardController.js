import prisma from "../config/prisma.js"

export const getDashboardStats = async (req, res) => {

 const users = await prisma.user.count()

 const rooms = await prisma.room.count()

 const reservations = await prisma.reservation.count()

 const orders = await prisma.order.count()

 const revenue = await prisma.payment.aggregate({
  _sum: {
   amount: true
  }
 })

 res.json({

  totalUsers: users,

  totalRooms: rooms,

  reservations,

  restaurantOrders: orders,

  totalRevenue: revenue._sum.amount || 0

 })
}