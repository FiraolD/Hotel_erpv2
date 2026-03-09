import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

const decodeToken = (token) => {
 try {
  return JSON.parse(atob(token.split(".")[1]))
 } catch {
  return null
 }
}

export function AuthProvider({ children }) {

 const [user, setUser] = useState(null)

 useEffect(() => {
  const token = localStorage.getItem("token")

  if (!token) {
   return
  }

  const payload = decodeToken(token)

  if (!payload || (payload.exp && payload.exp * 1000 < Date.now())) {
   localStorage.removeItem("token")
   setUser(null)
   return
  }

  setUser(payload)
 }, [])

 const login = (data) => {

  localStorage.setItem("token", data.token)

  setUser(data.user)

 }

 const logout = () => {

  localStorage.removeItem("token")

  setUser(null)

 }

 return (

  <AuthContext.Provider value={{ user, login, logout }}>

   {children}

  </AuthContext.Provider>

 )
}

export const useAuth = () => useContext(AuthContext)
