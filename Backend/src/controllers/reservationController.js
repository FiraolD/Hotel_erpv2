import prisma from "../config/prisma.js"

export const createReservation = async (req, res) => {

 const { roomId, checkIn, checkOut } = req.body

 const reservation = await prisma.reservation.create({
  data: {
   roomId,
   userId: req.user.id,
   checkIn: new Date(checkIn),
   checkOut: new Date(checkOut)
  }
 })

 await prisma.room.update({
  where: { id: roomId },
  data: { status: "occupied" }
 })

 res.json(reservation)
}

export const getReservations = async (req, res) => {

 const reservations = await prisma.reservation.findMany()

 res.json(reservations)
}