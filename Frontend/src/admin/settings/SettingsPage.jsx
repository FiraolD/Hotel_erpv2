import { useEffect, useState } from "react"

const SETTINGS_KEY = "hotel_admin_settings"

export default function SettingsPage() {
 const [settings, setSettings] = useState({
  hotelName: "Hotel ERP",
  supportEmail: "support@hotel.com",
  checkInTime: "14:00",
  checkOutTime: "11:00"
 })

 useEffect(() => {
  const saved = localStorage.getItem(SETTINGS_KEY)
  if (saved) {
   setSettings(JSON.parse(saved))
  }
 }, [])

 const onChange = (e) => {
  setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }))
 }

 const onSave = () => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  alert("Settings saved")
 }

 return (
  <div className="max-w-xl">
   <h1 className="text-2xl font-bold mb-4">Settings</h1>

   <div className="bg-white rounded shadow p-4 space-y-3">
    <label className="block">
     <span className="block text-sm mb-1">Hotel Name</span>
     <input name="hotelName" value={settings.hotelName} onChange={onChange} className="border p-2 rounded w-full" />
    </label>

    <label className="block">
     <span className="block text-sm mb-1">Support Email</span>
     <input name="supportEmail" value={settings.supportEmail} onChange={onChange} className="border p-2 rounded w-full" />
    </label>

    <label className="block">
     <span className="block text-sm mb-1">Check-in Time</span>
     <input type="time" name="checkInTime" value={settings.checkInTime} onChange={onChange} className="border p-2 rounded w-full" />
    </label>

    <label className="block">
     <span className="block text-sm mb-1">Check-out Time</span>
     <input type="time" name="checkOutTime" value={settings.checkOutTime} onChange={onChange} className="border p-2 rounded w-full" />
    </label>

    <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save Settings</button>
   </div>
  </div>
 )
}
