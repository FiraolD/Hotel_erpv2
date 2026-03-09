import prisma from "../config/prisma.js"

export const getInventory = async (req, res) => {

 const items = await prisma.inventoryItem.findMany()

 res.json(items)
}

export const addInventoryItem = async (req, res) => {

 const { name, quantity, unit } = req.body

 const item = await prisma.inventoryItem.create({
  data: {
   name,
   quantity,
   unit
  }
 })

 res.json(item)
}

export const updateInventory = async (req, res) => {

 const { id } = req.params
 const { quantity } = req.body

 const item = await prisma.inventoryItem.update({
  where: { id: Number(id) },
  data: { quantity }
 })

 res.json(item)
}