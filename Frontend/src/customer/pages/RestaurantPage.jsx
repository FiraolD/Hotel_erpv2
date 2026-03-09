import { useEffect, useState } from "react"
import api from "../../api/api"

export default function RestaurantPage() {

 const [menu, setMenu] = useState([])

 useEffect(() => {

  api.get("/menu")
   .then(res => setMenu(res.data))

 }, [])

 const addToCart = async (item) => {

  await api.post("/cart", {
   itemId: item.id,
   quantity: 1
  })

  alert("Added to cart")
 }

 return (

  <div>

   <h1 className="text-2xl font-bold mb-4">

    Restaurant Menu

   </h1>

   <div className="grid grid-cols-3 gap-4">

    {menu.map(item => (

     <div
      key={item.id}
      className="bg-white shadow p-4 rounded"
     >

      <h3 className="font-bold">{item.name}</h3>

      <p>${item.price}</p>

      <button
       onClick={() => addToCart(item)}
       className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
      >
       Add to Cart
      </button>

     </div>

    ))}

   </div>

  </div>

 )
}