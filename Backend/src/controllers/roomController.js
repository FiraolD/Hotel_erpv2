
import prisma from "../config/prisma.js"

export const getRooms = async (req, res) => {

 const rooms = await prisma.room.findMany()

 res.json(rooms)
}

export const createRoom = async (req, res) => {

 const { number, type, price } = req.body

 const room = await prisma.room.create({
  data: {
   number,
   type,
   price,
   status: "available"
  }
 })

 res.json(room)
}