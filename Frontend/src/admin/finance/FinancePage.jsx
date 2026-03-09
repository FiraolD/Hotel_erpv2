import { useEffect, useState } from "react"
import api from "../../api/api"

export default function FinancePage() {

 const [report, setReport] = useState(null)
 const [error, setError] = useState("")

 useEffect(() => {

  api.get("/finance/report")
   .then(res => setReport(res.data))
   .catch((err) => setError(err.response?.data?.message || "Failed to load finance report"))

 }, [])

 if (error) {
  return <div className="text-red-600">{error}</div>
 }

 if (!report) return <div>Loading...</div>

 return (

  <div>

   <h1>Finance</h1>

   <p>Total Revenue: ${report.totalRevenue}</p>

  </div>

 )
}
