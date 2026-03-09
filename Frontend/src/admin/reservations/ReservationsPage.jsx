import { useEffect, useState } from "react"
import api from "../../api/api"

export default function ReservationsPage() {

 const [data, setData] = useState([])

 useEffect(() => {

  api.get("/reservations")
   .then(res => setData(res.data))

 }, [])

 return (

  <div>

   <h1>Reservations</h1>

   {data.map(r => (

    <div key={r.id}>

     Reservation #{r.id}

    </div>

   ))}

  </div>

 )
}