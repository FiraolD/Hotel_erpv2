import { useEffect, useState } from "react"
import api from "../../api/api"

export default function CartPage() {

 const [cart, setCart] = useState([])

 useEffect(() => {

  api.get("/cart")
   .then(res => setCart(res.data))

 }, [])

 return (

  <div>

   <h1 className="text-2xl font-bold mb-4">

    Cart

   </h1>

   {cart.map(item => (

    <div key={item.itemId}>

     Item #{item.itemId} — Qty {item.quantity}

    </div>

   ))}

  </div>

 )
}