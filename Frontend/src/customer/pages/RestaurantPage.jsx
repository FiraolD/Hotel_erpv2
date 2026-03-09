import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/api"

export default function RestaurantPage() {

 const [menu, setMenu] = useState([])
 const navigate = useNavigate()

 useEffect(() => {
  api.get("/menu")
   .then(res => setMenu(res.data))
 }, [])

 const addToCart = async (item) => {
  await api.post("/cart", {
   itemId: item.id,
   quantity: 1
  })

  alert(`${item.name} added to cart`)
 }

 return (
  <div>
   <div className="flex items-center justify-between mb-4">
    <h1 className="text-2xl font-bold">Restaurant Menu</h1>
    <button onClick={() => navigate("/hotel/checkout")} className="bg-blue-600 text-white px-4 py-2 rounded">Go to Checkout</button>
   </div>

   <div className="grid grid-cols-3 gap-4">
    {menu.map(item => (
     <button
      key={item.id}
      onClick={() => addToCart(item)}
      className="bg-white shadow p-4 rounded text-left hover:shadow-lg border"
     >
      <h3 className="font-bold">{item.name}</h3>
      <p>${item.price}</p>
      <p className="text-sm text-gray-500 mt-2">Click item to add to cart</p>
     </button>
    ))}
   </div>
  </div>
 )
}
