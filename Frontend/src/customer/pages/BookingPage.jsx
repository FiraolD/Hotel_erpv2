import { useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api/api"

export default function BookingPage() {

 const { id } = useParams()

 const [checkIn, setCheckIn] = useState("")
 const [checkOut, setCheckOut] = useState("")

 const bookRoom = async () => {

  await api.post("/reservations", {

   roomId: Number(id),

   checkIn,

   checkOut

  })

  alert("Room booked successfully!")

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

   <button
    onClick={bookRoom}
    className="bg-blue-600 text-white px-6 py-2 rounded"
   >
    Confirm Booking
   </button>

  </div>

 )
}