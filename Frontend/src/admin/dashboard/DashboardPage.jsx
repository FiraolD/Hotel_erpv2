import { useEffect, useState } from "react"
import api from "../../api/api"
import StatCard from "../../components/StatCard"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardPage() {

 const [stats, setStats] = useState(null)

 useEffect(() => {

  api.get("/dashboard").then(res => setStats(res.data))

 }, [])

 if (!stats) return <div>Loading...</div>

 const chartData = [
  { name: "Rooms", value: stats.totalRooms },
  { name: "Reservations", value: stats.reservations },
  { name: "Orders", value: stats.restaurantOrders }
 ]

 return (

  <div className="space-y-6">

   <h1 className="text-2xl font-bold">Dashboard Overview</h1>

   <div className="grid grid-cols-4 gap-4">

    <StatCard title="Users" value={stats.totalUsers} />

    <StatCard title="Rooms" value={stats.totalRooms} />

    <StatCard title="Reservations" value={stats.reservations} />

    <StatCard title="Revenue" value={`$${stats.totalRevenue}`} />

   </div>

   <div className="bg-white p-6 rounded-lg shadow">

    <h2 className="text-lg font-semibold mb-4">System Activity</h2>

    <ResponsiveContainer width="100%" height={300}>

     <BarChart data={chartData}>

      <XAxis dataKey="name"/>

      <YAxis/>

      <Tooltip/>

      <Bar dataKey="value"/>

     </BarChart>

    </ResponsiveContainer>

   </div>

  </div>

 )
}