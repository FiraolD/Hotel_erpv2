import { useEffect, useState } from "react"
import api from "../../api/api"

export default function OrdersPage() {

 const [orders, setOrders] = useState([])

 useEffect(() => {

  api.get("/orders")
   .then(res => setOrders(res.data))

 }, [])

 return (

  <div>

   <h1>Restaurant Orders</h1>

   {orders.map(order => (

    <div key={order.id}>

     Order #{order.id} — {order.status}

    </div>

   ))}

  </div>

 )
}