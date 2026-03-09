import prisma from "../config/prisma.js"

export const createTask = async (req, res) => {

 const { roomId, task } = req.body

 const newTask = await prisma.housekeepingTask.create({
  data: {
   roomId,
   task,
   status: "pending"
  }
 })

 res.json(newTask)
}

export const getTasks = async (req, res) => {

 const tasks = await prisma.housekeepingTask.findMany()

 res.json(tasks)
}

export const updateTaskStatus = async (req, res) => {

 const { id } = req.params
 const { status } = req.body

 const task = await prisma.housekeepingTask.update({
  where: { id: Number(id) },
  data: { status }
 })

 res.json(task)
}