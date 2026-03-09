import { Link } from "react-router-dom"
import { Home, Bed, Calendar, ShoppingCart, Package, DollarSign, Brush } from "lucide-react"

export default function Sidebar() {

 return (

  <div className="w-64 bg-gray-900 text-white p-6">

   <h2 className="text-2xl font-bold mb-6">Hotel ERP</h2>

   <nav className="space-y-3">

    <Link className="flex items-center gap-2 hover:text-blue-400" to="/">
     <Home size={18}/> Dashboard
    </Link>

    <Link className="flex items-center gap-2 hover:text-blue-400" to="/rooms">
     <Bed size={18}/> Rooms
    </Link>

    <Link className="flex items-center gap-2 hover:text-blue-400" to="/reservations">
     <Calendar size={18}/> Reservations
    </Link>

    <Link className="flex items-center gap-2 hover:text-blue-400" to="/orders">
     <ShoppingCart size={18}/> Orders
    </Link>

    <Link className="flex items-center gap-2 hover:text-blue-400" to="/inventory">
     <Package size={18}/> Inventory
    </Link>

    <Link className="flex items-center gap-2 hover:text-blue-400" to="/finance">
     <DollarSign size={18}/> Finance
    </Link>

    <Link className="flex items-center gap-2 hover:text-blue-400" to="/housekeeping">
     <Brush size={18}/> Housekeeping
    </Link>

   </nav>

  </div>

 )
}