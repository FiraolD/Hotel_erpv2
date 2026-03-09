import { useEffect, useState } from "react"
import api from "../../api/api"

export default function InventoryPage() {

 const [items, setItems] = useState([])

 useEffect(() => {

  api.get("/inventory")
   .then(res => setItems(res.data))

 }, [])

 return (

  <div>

   <h1>Inventory</h1>

   {items.map(item => (

    <div key={item.id}>

     {item.name} — {item.quantity} {item.unit}

    </div>

   ))}

  </div>

 )
}