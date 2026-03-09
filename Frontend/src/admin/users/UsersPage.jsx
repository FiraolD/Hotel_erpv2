import { useEffect, useState } from "react"
import api from "../../api/api"

export default function UsersPage() {
 const [users, setUsers] = useState([])
 const [error, setError] = useState("")

 useEffect(() => {
  api.get("/users")
   .then((res) => setUsers(res.data))
   .catch((err) => setError(err.response?.data?.message || "Failed to load users"))
 }, [])

 return (
  <div>
   <h1 className="text-2xl font-bold mb-4">Users</h1>

   {error && <p className="text-red-600 mb-3">{error}</p>}

   <div className="bg-white rounded shadow overflow-hidden">
    <table className="w-full text-sm">
     <thead className="bg-gray-100 text-left">
      <tr>
       <th className="p-3">ID</th>
       <th className="p-3">Username</th>
       <th className="p-3">Role</th>
       <th className="p-3">Created</th>
      </tr>
     </thead>
     <tbody>
      {users.map((user) => (
       <tr key={user.id} className="border-t">
        <td className="p-3">{user.id}</td>
        <td className="p-3">{user.username}</td>
        <td className="p-3 capitalize">{user.role}</td>
        <td className="p-3">{new Date(user.createdAt).toLocaleString()}</td>
       </tr>
      ))}
     </tbody>
    </table>

    {!users.length && !error && (
     <p className="p-4 text-gray-500">No users found.</p>
    )}
   </div>
  </div>
 )
}
