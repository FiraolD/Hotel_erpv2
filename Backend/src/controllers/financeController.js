import prisma from "../config/prisma.js"

export const createInvoice = async (req, res) => {

 const { userId, total } = req.body

 const invoice = await prisma.invoice.create({
  data: {
   userId,
   total,
   status: "unpaid"
  }
 })

 res.json(invoice)
}

export const recordPayment = async (req, res) => {

 const { invoiceId, amount, method } = req.body

 const payment = await prisma.payment.create({
  data: {
   invoiceId,
   amount,
   method
  }
 })

 await prisma.invoice.update({
  where: { id: invoiceId },
  data: { status: "paid" }
 })

 res.json(payment)
}

export const getRevenueReport = async (req, res) => {

 const payments = await prisma.payment.findMany()

 const total = payments.reduce((sum, p) => sum + p.amount, 0)

 res.json({
  totalRevenue: total,
  payments
 })
}