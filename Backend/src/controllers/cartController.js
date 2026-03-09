let carts = {}

export const addToCart = (req, res) => {

 const userId = req.user.id
 const { itemId, quantity } = req.body

 if (!carts[userId]) {
  carts[userId] = []
 }

 carts[userId].push({ itemId, quantity })

 res.json(carts[userId])
}

export const getCart = (req, res) => {

 const userId = req.user.id

 res.json(carts[userId] || [])
}