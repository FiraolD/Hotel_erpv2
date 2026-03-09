import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/api"

const LOCAL_CART_KEY = "hotel_customer_cart"

export default function CartPage() {

 const [cart, setCart] = useState([])
 const navigate = useNavigate()

 useEffect(() => {
  api.get("/cart")
   .then(res => setCart(res.data))
   .catch(() => {
    const localCart = JSON.parse(localStorage.getItem(LOCAL_CART_KEY) || "[]")
    setCart(localCart)
   })
 }, [])

 const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart])

 return (

  <div>

   <h1 className="text-2xl font-bold mb-2">Cart</h1>
   <p className="mb-4 text-gray-600">Total items: {totalItems}</p>

   {cart.map((item, index) => (
<<<<<<< codex/fix-admin-and-customer-side-issues-i667gs
    <div key={`${item.itemId}-${index}`} className="mb-2 border-b pb-2">
     <p>{item.name || `Item #${item.itemId}`} — Qty {item.quantity}</p>
     {typeof item.price === "number" && <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>}
    </div>
   ))}

   {!cart.length && <p className="text-gray-500">Your cart is empty.</p>}

=======
<<<<<<< codex/fix-admin-and-customer-side-issues-nvo8lk
    <div key={`${item.itemId}-${index}`} className="mb-2 border-b pb-2">
     <p>{item.name || `Item #${item.itemId}`} — Qty {item.quantity}</p>
     {typeof item.price === "number" && <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>}
    </div>
   ))}

   {!cart.length && <p className="text-gray-500">Your cart is empty.</p>}

=======
    <div key={`${item.itemId}-${index}`} className="mb-2">
     Item #{item.itemId} — Qty {item.quantity}
    </div>
   ))}

>>>>>>> main
>>>>>>> main
   <button onClick={() => navigate("/hotel/checkout")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
    Proceed to Checkout
   </button>

  </div>

 )
}
