import prisma from "../config/prisma.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {

 const { username, password, role } = req.body

 const hashed = await bcrypt.hash(password, 10)

 const user = await prisma.user.create({
  data: {
   username,
   password: hashed,
   role
  }
 })

 res.json(user)
}

export const login = async (req, res) => {

 const { username, password } = req.body

 const user = await prisma.user.findUnique({
  where: { username }
 })

 if (!user) {
  return res.status(400).json({ message: "User not found" })
 }

 const valid = await bcrypt.compare(password, user.password)

 if (!valid) {
  return res.status(401).json({ message: "Invalid password" })
 }

 const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
 )

 res.json({ token })
}