import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

const api = Router()

api.post(
	'/register',
	body('email').isEmail(),
	body('password').isLength({ min: 6 }).isString(),
	body('passwordConfirmation').isLength({ min: 6 }),
	async (req: Request, res: Response) => req.business.createUser(req, res),
)

api.post('/signin', body('email').isEmail(), body('password').isLength({ min: 6 }).isString(), async (req: Request, res: Response) =>
	req.business.login(req, res),
)

export default api
