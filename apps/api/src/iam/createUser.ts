import { Request, Response } from 'express'
import { Options } from './types'
import { validationResult } from 'express-validator'
import { hashPassword, generateToken } from './auth'

export const createUser = async (opts: Options, req: Request, res: Response) => {
	const { email, password, passwordConfirmation } = req.body

	const errors = validationResult(req)

	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

	if (password !== passwordConfirmation) return res.status(400).json({ message: 'Passwords do not match' })

	const user = await opts.database.prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (user) return res.status(400).send('User already exists')

	const encryptedPassword = await hashPassword(password)

	const newUser = await opts.database.prisma.user.create({
		data: {
			email,
			encryptedPassword,
			role: 'USER',
		},
	})

	const payload = {
		uuid: newUser.uuid,
		email: newUser.email,
	}

	const token = generateToken(opts, payload)

	res.status(200).json({ user: newUser, meta: { token } })
}
