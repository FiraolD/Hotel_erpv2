import prisma from "../config/prisma.js"
import bcrypt from "bcryptjs"

export const getUsers = async (_req, res) => {

 try {
  const users = await prisma.user.findMany({
   select: {
    id: true,
    username: true,
    role: true,
    createdAt: true
   }
  })

  res.json(users)
 } catch (error) {
  res.status(500).json({ message: "Failed to fetch users", error: error.message })
 }
}

export const createUser = async (req, res) => {

 try {
  const { username, password, role } = req.body

  if (!username || !password || !role) {
   return res.status(400).json({ message: "username, password and role are required" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
   data: {
    username,
    password: hashedPassword,
    role
   },
   select: {
    id: true,
    username: true,
    role: true,
    createdAt: true
   }
  })

  res.json(user)
 } catch (error) {
  res.status(500).json({ message: "Failed to create user", error: error.message })
 }
}
