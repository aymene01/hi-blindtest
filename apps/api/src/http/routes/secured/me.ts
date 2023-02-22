import { Router } from 'express'

const api = Router()

api.get('/', async (req, res) => {
	const {
		user: { role, uuid },
	} = req

	res.json({ role, uuid })
})

export default api
