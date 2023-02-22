import { Request, Response } from 'express'
import { Options } from './types'
import { validationResult } from 'express-validator'
import { comparePassword, generateToken } from './auth'

export const login = async (opts: Options, req: Request, res: Response) => {
	const { email, password } = req.body

	const errors = validationResult(req)
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

	const user = await opts.database.prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (!user) return res.status(400).send('User does not exist')

	const isPasswordValid = await comparePassword(password, user.encryptedPassword)

	if (!isPasswordValid) return res.status(400).send('Invalid password')

	const payload = {
		uuid: user.uuid,
		email: user.email,
	}

	const token = generateToken(opts, payload)

	res.status(200).json({ user, meta: { token } })
}
