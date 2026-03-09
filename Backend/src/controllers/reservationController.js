import prisma from "../config/prisma.js"
import { getOrCreateGuestUserId } from "../utils/userUtils.js"

export const createReservation = async (req, res) => {

 try {
  const { roomId, checkIn, checkOut } = req.body

  if (!roomId || !checkIn || !checkOut) {
   return res.status(400).json({ message: "roomId, checkIn and checkOut are required" })
  }

  const userId = req.user?.id || await getOrCreateGuestUserId()

  const reservation = await prisma.reservation.create({
   data: {
    roomId,
    userId,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut)
   }
  })

  await prisma.room.update({
   where: { id: roomId },
   data: { status: "occupied" }
  })

  res.json(reservation)
 } catch (error) {
  res.status(500).json({ message: "Failed to create reservation", error: error.message })
 }
}

export const getReservations = async (_req, res) => {

 try {
  const reservations = await prisma.reservation.findMany()
  res.json(reservations)
 } catch (error) {
  res.status(500).json({ message: "Failed to fetch reservations", error: error.message })
 }
}
