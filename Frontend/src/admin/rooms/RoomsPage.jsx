import { useEffect, useState } from "react"
import api from "../../api/api"

export default function RoomsPage() {

 const [rooms, setRooms] = useState([])

 useEffect(() => {

  api.get("/rooms").then(res => setRooms(res.data))

 }, [])

 return (

  <div>

   <h1 className="text-2xl font-bold mb-4">Rooms</h1>

   <table className="w-full bg-white rounded shadow">

    <thead className="bg-gray-100">

     <tr>

      <th className="p-3 text-left">Number</th>

      <th className="p-3 text-left">Type</th>

      <th className="p-3 text-left">Price</th>

      <th className="p-3 text-left">Status</th>

     </tr>

    </thead>

    <tbody>

     {rooms.map(room => (

      <tr key={room.id} className="border-t">

       <td className="p-3">{room.number}</td>

       <td className="p-3">{room.type}</td>

       <td className="p-3">${room.price}</td>

       <td className="p-3">{room.status}</td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 )
}