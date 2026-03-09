let carts = {}

const getCartOwnerKey = (req) => {
 if (req.user?.id) {
  return `user:${req.user.id}`
 }

 const guestKey = req.headers["x-guest-id"] || "guest-session"
 return `guest:${guestKey}`
}

export const addToCart = (req, res) => {

 const ownerKey = getCartOwnerKey(req)
 const { itemId, quantity } = req.body

 if (!itemId || !quantity) {
  return res.status(400).json({ message: "itemId and quantity are required" })
 }

 if (!carts[ownerKey]) {
  carts[ownerKey] = []
 }

 const existing = carts[ownerKey].find((item) => item.itemId === itemId)

 if (existing) {
  existing.quantity += quantity
 } else {
  carts[ownerKey].push({ itemId, quantity })
 }

 res.json(carts[ownerKey])
}

export const getCart = (req, res) => {

 const ownerKey = getCartOwnerKey(req)

 res.json(carts[ownerKey] || [])
}

export const clearCart = (req) => {
 const ownerKey = getCartOwnerKey(req)
 carts[ownerKey] = []
}
