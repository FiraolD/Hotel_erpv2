import { useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api/api"

const LOCAL_RESERVATIONS_KEY = "hotel_customer_reservations"

export default function BookingPage() {

 const { id } = useParams()

 const [checkIn, setCheckIn] = useState("")
 const [checkOut, setCheckOut] = useState("")
 const [receipt, setReceipt] = useState(null)

<<<<<<< codex/fix-admin-and-customer-side-issues-nvo8lk
 const saveLocalReservation = () => {
  const existing = JSON.parse(localStorage.getItem(LOCAL_RESERVATIONS_KEY) || "[]")
  existing.push({
   roomId: Number(id),
   checkIn,
   checkOut,
   receiptFileName: receipt.name,
   createdAt: new Date().toISOString(),
   status: "pending"
=======
 const bookRoom = async () => {
  if (!receipt) {
   alert("Please attach your payment receipt before confirming.")
   return
  }

  await api.post("/reservations", {
   roomId: Number(id),
   checkIn,
   checkOut,
   receiptFileName: receipt.name
>>>>>>> main
  })
  localStorage.setItem(LOCAL_RESERVATIONS_KEY, JSON.stringify(existing))
 }

<<<<<<< codex/fix-admin-and-customer-side-issues-nvo8lk
 const bookRoom = async () => {
  if (!checkIn || !checkOut) {
   alert("Please select check-in and check-out dates.")
   return
  }

  if (!receipt) {
   alert("Please attach your payment receipt before confirming.")
   return
  }

  try {
   await api.post("/reservations", {
    roomId: Number(id),
    checkIn,
    checkOut,
    receiptFileName: receipt.name
   })
  } catch {
   saveLocalReservation()
  }

=======
>>>>>>> main
  alert("Reservation submitted successfully with receipt reference.")
 }

 return (

  <div>

   <h1 className="text-2xl font-bold mb-4">
    Book Room
   </h1>

   <input
    type="date"
    className="border p-2 block mb-3"
    onChange={e => setCheckIn(e.target.value)}
   />

   <input
    type="date"
    className="border p-2 block mb-3"
    onChange={e => setCheckOut(e.target.value)}
   />

   <label className="block mb-4">
    <span className="block mb-1 text-sm font-medium">Attach payment receipt</span>
    <input
     type="file"
     accept="image/*,.pdf"
     className="border p-2 block w-full max-w-md"
     onChange={(e) => setReceipt(e.target.files?.[0] || null)}
    />
   </label>

   <button
    onClick={bookRoom}
    className="bg-blue-600 text-white px-6 py-2 rounded"
   >
    Confirm Reservation
   </button>

  </div>

 )
}
