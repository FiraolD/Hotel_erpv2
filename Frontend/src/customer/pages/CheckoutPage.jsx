import { useEffect, useMemo, useState } from "react"
import api from "../../api/api"

export default function CheckoutPage() {
 const [cart, setCart] = useState([])
 const [menuMap, setMenuMap] = useState({})
 const [fulfillmentType, setFulfillmentType] = useState("delivery")
 const [address, setAddress] = useState("")
 const [pickupTime, setPickupTime] = useState("")
 const [notes, setNotes] = useState("")

 useEffect(() => {
  Promise.all([api.get("/cart"), api.get("/menu")]).then(([cartRes, menuRes]) => {
   setCart(cartRes.data)
   const mapped = menuRes.data.reduce((acc, item) => {
    acc[item.id] = item
    return acc
   }, {})
   setMenuMap(mapped)
  })
 }, [])

 const total = useMemo(() => {
  return cart.reduce((sum, cartItem) => {
   const menuItem = menuMap[cartItem.itemId]
   if (!menuItem) return sum
   return sum + (menuItem.price * cartItem.quantity)
  }, 0)
 }, [cart, menuMap])

 const placeOrder = async () => {
  if (fulfillmentType === "delivery" && !address.trim()) {
   alert("Delivery address is required")
   return
  }

  if (fulfillmentType === "pickup" && !pickupTime) {
   alert("Pickup time is required")
   return
  }

  await api.post("/orders", {
   total,
   fulfillmentType,
   address,
   pickupTime,
   notes
  })

  alert("Order placed successfully")
 }

 return (
  <div className="max-w-3xl">
   <h1 className="text-2xl font-bold mb-4">Restaurant Checkout</h1>

   <div className="bg-white rounded shadow p-4 mb-4">
    <h2 className="text-lg font-semibold mb-2">Your Items</h2>
    {cart.map((item, index) => {
     const menuItem = menuMap[item.itemId]
     return (
      <div key={`${item.itemId}-${index}`} className="flex justify-between border-b py-2">
       <span>{menuItem?.name || `Item #${item.itemId}`} x {item.quantity}</span>
       <span>${menuItem ? (menuItem.price * item.quantity).toFixed(2) : "0.00"}</span>
      </div>
     )
    })}
    <p className="text-right font-bold mt-3">Total: ${total.toFixed(2)}</p>
   </div>

   <div className="bg-white rounded shadow p-4 space-y-3">
    <div>
     <p className="font-semibold mb-1">Fulfillment</p>
     <label className="mr-4">
      <input type="radio" name="fulfillment" value="delivery" checked={fulfillmentType === "delivery"} onChange={(e) => setFulfillmentType(e.target.value)} /> Delivery
     </label>
     <label>
      <input type="radio" name="fulfillment" value="pickup" checked={fulfillmentType === "pickup"} onChange={(e) => setFulfillmentType(e.target.value)} /> Pickup
     </label>
    </div>

    {fulfillmentType === "delivery" ? (
     <label className="block">
      <span className="block text-sm mb-1">Delivery address</span>
      <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border p-2 rounded" rows={3} />
     </label>
    ) : (
     <label className="block">
      <span className="block text-sm mb-1">Preferred pickup time</span>
      <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="border p-2 rounded" />
     </label>
    )}

    <label className="block">
     <span className="block text-sm mb-1">Order notes (optional)</span>
     <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border p-2 rounded" rows={2} />
    </label>

    <button onClick={placeOrder} className="bg-green-600 text-white px-5 py-2 rounded">Place Order</button>
   </div>
  </div>
 )
}
