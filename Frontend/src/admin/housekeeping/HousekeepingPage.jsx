import { useEffect, useState } from "react"
import api from "../../api/api"

export default function HousekeepingPage() {

 const [tasks, setTasks] = useState([])
 const [error, setError] = useState("")

 useEffect(() => {

  api.get("/housekeeping")
   .then(res => setTasks(res.data))
   .catch((err) => setError(err.response?.data?.message || "Failed to load housekeeping tasks"))

 }, [])

 return (

  <div>

   <h1>Housekeeping Tasks</h1>

   {error && <p className="text-red-600 mb-2">{error}</p>}

   {tasks.map(t => (

    <div key={t.id}>

     Room {t.roomId} — {t.task} — {t.status}

    </div>

   ))}

   {!tasks.length && !error && <p>No tasks found.</p>}

  </div>

 )
}
