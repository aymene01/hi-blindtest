import { Router } from 'express'
import me from './me'
import { authorize } from '@/http/middlewares/authorized'

const api = Router()

api.use('/me', authorize('ADMIN', 'USER'), me)

export default api
