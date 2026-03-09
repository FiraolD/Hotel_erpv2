import { useEffect, useState } from "react"
import api from "../../api/api"

export default function HousekeepingPage() {

 const [tasks, setTasks] = useState([])

 useEffect(() => {

  api.get("/housekeeping")
   .then(res => setTasks(res.data))

 }, [])

 return (

  <div>

   <h1>Housekeeping Tasks</h1>

   {tasks.map(t => (

    <div key={t.id}>

     Room {t.roomId} — {t.task} — {t.status}

    </div>

   ))}

  </div>

 )
}