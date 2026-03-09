import bcrypt from "bcryptjs"
import prisma from "../config/prisma.js"

export const getOrCreateGuestUserId = async () => {
 const guestUsername = "guest_customer"

 const existing = await prisma.user.findUnique({
  where: { username: guestUsername }
 })

 if (existing) {
  return existing.id
 }

 const hashedPassword = await bcrypt.hash("guest_password_do_not_use", 10)

 const created = await prisma.user.create({
  data: {
   username: guestUsername,
   password: hashedPassword,
   role: "customer"
  }
 })

 return created.id
}
