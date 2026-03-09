import { useEffect, useState } from "react"
import api from "../../api/api"

export default function FinancePage() {

 const [report, setReport] = useState(null)

 useEffect(() => {

  api.get("/finance/report")
   .then(res => setReport(res.data))

 }, [])

 if (!report) return <div>Loading...</div>

 return (

  <div>

   <h1>Finance</h1>

   <p>Total Revenue: ${report.totalRevenue}</p>

  </div>

 )
}