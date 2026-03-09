import { Link } from "react-router-dom"

export default function CustomerNavbar() {

 return (

  <div className="bg-blue-600 text-white p-4 flex justify-between">

   <h1 className="font-bold">Hotel Portal</h1>

   <div className="flex gap-4">

    <Link to="/hotel">Home</Link>

    <Link to="/hotel/rooms">Rooms</Link>

    <Link to="/hotel/restaurant">Restaurant</Link>

    <Link to="/hotel/cart">Cart</Link>

    <Link to="/hotel/checkout">Checkout</Link>

   </div>

  </div>

 )
}