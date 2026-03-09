import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {

 const [username, setUsername] = useState("")
 const [password, setPassword] = useState("")

 const { login } = useAuth()

 const navigate = useNavigate()

 const handleLogin = async () => {

  const res = await api.post("/auth/login", {
   username,
   password
  })

  const token = res.data.token

  const payload = JSON.parse(atob(token.split(".")[1]))

  login({
   token,
   user: payload
  })

  navigate("/")
 }

 return (

  <div className="flex items-center justify-center h-screen bg-gray-100">

   <div className="bg-white p-8 rounded shadow w-80">

    <h1 className="text-xl font-bold mb-4">Login</h1>

    <input
     className="border p-2 w-full mb-3"
     placeholder="Username"
     onChange={e => setUsername(e.target.value)}
    />

    <input
     type="password"
     className="border p-2 w-full mb-3"
     placeholder="Password"
     onChange={e => setPassword(e.target.value)}
    />

    <button
     onClick={handleLogin}
     className="bg-blue-600 text-white w-full p-2 rounded"
    >
     Login
    </button>

   </div>

  </div>

 )
}