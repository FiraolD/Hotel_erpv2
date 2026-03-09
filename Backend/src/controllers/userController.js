import prisma from "../config/prisma.js"

export const getUsers = async (req, res) => {

 const users = await prisma.user.findMany()

 res.json(users)
}

export const createUser = async (req, res) => {

 const { username, password, role } = req.body

 const user = await prisma.user.create({
  data: { username, password, role }
 })

 res.json(user)
}