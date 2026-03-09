import prisma from "../config/prisma.js"

export const getMenu = async (req, res) => {

 const menu = await prisma.menuItem.findMany()

 res.json(menu)
}

export const createMenuItem = async (req, res) => {

 const { name, price, category } = req.body

 const item = await prisma.menuItem.create({
  data: {
   name,
   price,
   category
  }
 })

 res.json(item)
}