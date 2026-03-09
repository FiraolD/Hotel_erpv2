import React, { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import CustomerLayout from './components/CustomerLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRooms from './pages/admin/AdminRooms';
import AdminEmailLogs from './pages/admin/AdminEmailLogs';
import CustomerHome from './pages/customer/CustomerHome';
import CustomerRooms from './pages/customer/CustomerRooms';
import CustomerRestaurant from './pages/customer/CustomerRestaurant';
import Checkout from './pages/customer/Checkout';
import { Toaster } from 'sonner';

export type AppMode = 'admin' | 'customer';
export type AdminPage = 'dashboard' | 'rooms' | 'reservations' | 'inventory' | 'emails' | 'settings';
export type CustomerPage = 'home' | 'rooms' | 'restaurant' | 'checkout' | 'dashboard';

export default function App() {
  const [mode, setMode] = useState<AppMode>('customer');
  const [adminPage, setAdminPage] = useState<AdminPage>('dashboard');
  const [customerPage, setCustomerPage] = useState<CustomerPage>('home');

  const navigateToCheckout = () => {
    setCustomerPage('checkout');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Toaster position="top-right" expand={true} richColors />
      
      {/* Mode Toggle for Demo Purposes */}
      <div className="fixed bottom-4 right-4 z-[9999] flex gap-2">
        <button 
          onClick={() => setMode(mode === 'admin' ? 'customer' : 'admin')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all font-bold text-sm hover:scale-105 active:scale-95"
        >
          {mode === 'admin' ? '✨ Switch to Guest View' : '⚙️ Switch to Staff Admin'}
        </button>
      </div>

      {mode === 'admin' ? (
        <AdminLayout activePage={adminPage} onNavigate={setAdminPage}>
          {adminPage === 'dashboard' && <AdminDashboard />}
          {adminPage === 'rooms' && <AdminRooms />}
          {adminPage === 'emails' && <AdminEmailLogs />}
          {/* Default back to dashboard for unhandled pages */}
          {['reservations', 'inventory', 'restaurant', 'housekeeping', 'finance', 'users', 'settings'].includes(adminPage) && (
            <div className="flex items-center justify-center h-[60vh] text-slate-400">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Module Coming Soon</h2>
                <p>This section is under development for Hotel ERP v2.</p>
              </div>
            </div>
          )}
        </AdminLayout>
      ) : (
        <CustomerLayout activePage={customerPage} onNavigate={setCustomerPage}>
          {customerPage === 'home' && <CustomerHome onBookNow={() => setCustomerPage('rooms')} />}
          {customerPage === 'rooms' && (
             <div className="space-y-4">
                <CustomerRooms />
                <div className="flex justify-center pb-12">
                   <button 
                    onClick={navigateToCheckout}
                    className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl"
                   >
                    Proceed to Reservation Preview
                   </button>
                </div>
             </div>
          )}
          {customerPage === 'restaurant' && <CustomerRestaurant />}
          {customerPage === 'checkout' && <Checkout onBack={() => setCustomerPage('rooms')} />}
        </CustomerLayout>
      )}
    </div>
  );
}