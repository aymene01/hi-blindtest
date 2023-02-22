import { Router } from 'express'
import user from './user'

const api = Router()

api.use('/', user)

export default api
