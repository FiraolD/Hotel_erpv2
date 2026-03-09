import CustomerNavbar from "../components/CustomerNavbar"

export default function CustomerLayout({ children }) {

 return (

  <div>

   <CustomerNavbar />

   <main className="p-6 max-w-6xl mx-auto">

    {children}

   </main>

  </div>

 )
}