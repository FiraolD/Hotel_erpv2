import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "./auth/LoginPage"

import DashboardPage from "./admin/dashboard/DashboardPage"
import RoomsPage from "./admin/rooms/RoomsPage"
import ReservationsPage from "./admin/reservations/ReservationsPage"
import OrdersPage from "./admin/orders/OrdersPage"
import InventoryPage from "./admin/inventory/InventoryPage"
import FinancePage from "./admin/finance/FinancePage"
import HousekeepingPage from "./admin/housekeeping/HousekeepingPage"
import HomePage from "./customer/pages/HomePage"
import CustomerRoomsPage from "./customer/pages/RoomsPage"
import BookingPage from "./customer/pages/BookingPage"
import RestaurantPage from "./customer/pages/RestaurantPage"
import CartPage from "./customer/pages/CartPage"
import CustomerLayout from "./customer/layout/CustomerLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardLayout from "./layout/DashboardLayout"
import EmailDashboard from "./admin/email/EmailDashboard";


export default function App() {

 return (

  <BrowserRouter>

   <Routes>

    <Route path="/login" element={<LoginPage />} />

    <Route path="/" element={
     <ProtectedRoute roles={["admin","manager","staff"]}>
      <DashboardLayout>
       <DashboardPage />
      </DashboardLayout>
     </ProtectedRoute>
    }/>

    <Route path="/rooms" element={
     <ProtectedRoute roles={["admin","manager"]}>
      <DashboardLayout>
       <RoomsPage />
      </DashboardLayout>
     </ProtectedRoute>
    }/>

    <Route path="/reservations" element={
     <ProtectedRoute roles={["admin","manager","staff"]}>
      <DashboardLayout>
       <ReservationsPage />
      </DashboardLayout>
     </ProtectedRoute>
    }/>

    <Route path="/orders" element={
     <ProtectedRoute roles={["admin","manager","staff"]}>
      <DashboardLayout>
       <OrdersPage />
      </DashboardLayout>
     </ProtectedRoute>
    }/>

    <Route path="/inventory" element={
     <ProtectedRoute roles={["admin","manager"]}>
      <DashboardLayout>
       <InventoryPage />
      </DashboardLayout>
     </ProtectedRoute>
    }/>

    <Route path="/finance" element={
     <ProtectedRoute roles={["admin"]}>
      <DashboardLayout>
       <FinancePage />
      </DashboardLayout>
     </ProtectedRoute>
    }/>

    <Route path="/housekeeping" element={
     <ProtectedRoute roles={["admin","manager","staff"]}>
      <DashboardLayout>
       <HousekeepingPage />
      </DashboardLayout>
     </ProtectedRoute>
    }/>

    <Route path="/hotel" element={
 <CustomerLayout>
  <HomePage/>
 </CustomerLayout>
}/>

<Route path="/hotel/rooms" element={
 <CustomerLayout>
  <CustomerRoomsPage/>
 </CustomerLayout>
}/>

<Route path="/hotel/book/:id" element={
 <CustomerLayout>
  <BookingPage/>
 </CustomerLayout>
}/>

<Route path="/hotel/restaurant" element={
 <CustomerLayout>
  <RestaurantPage/>
 </CustomerLayout>
}/>

<Route path="/admin/email-logs" element={
  <ProtectedRoute roles={["admin"]}>
    <DashboardLayout>
      <EmailDashboard />
    </DashboardLayout>
  </ProtectedRoute>
} />


<Route path="/hotel/cart" element={
 <CustomerLayout>
  <CartPage/>
 </CustomerLayout>
}/>

   </Routes>

  </BrowserRouter>

 )
}







