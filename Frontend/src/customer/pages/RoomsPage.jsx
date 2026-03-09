import { useEffect, useState } from "react"
import api from "../../api/api"
import RoomCard from "../components/RoomCard"
import { useNavigate } from "react-router-dom"

export default function RoomsPage() {

 const [rooms, setRooms] = useState([])

 const navigate = useNavigate()

 useEffect(() => {

  api.get("/rooms")
   .then(res => setRooms(res.data))

 }, [])

 const bookRoom = (room) => {

  navigate(`/hotel/book/${room.id}`)
 }

 return (

  <div>

   <h1 className="text-2xl font-bold mb-4">

    Available Rooms

   </h1>

   <div className="grid grid-cols-3 gap-4">

    {rooms.map(room => (

     <RoomCard
      key={room.id}
      room={room}
      onBook={bookRoom}
     />

    ))}

   </div>

  </div>

 )
}