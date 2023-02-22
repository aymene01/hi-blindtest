import auth from './auth'
import secured from './secured'
import { authenticate } from '@/middlewares/authenticate'
import { Router } from 'express'

const router = Router()

router.use('/auth', auth)
router.use('/', authenticate, secured)

export default router
