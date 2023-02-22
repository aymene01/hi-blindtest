import { Request, Response, NextFunction } from 'express'
import { Options } from './types'
import { verifyJwt } from './auth'

export const authenticate = async (opts: Options, req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers

	if (!authorization || !authorization.startsWith('Bearer')) return res.status(401).json({ message: 'Not authorized' })

	const [, token] = authorization.split('Bearer ')

	if (!token) return res.status(401).json({ message: 'Not Authorized' })

	try {
		const { uuid } = verifyJwt(opts, token)

		const user = await opts.database.prisma.user.findUnique({
			where: {
				uuid,
			},
		})

		if (!user) return res.status(401).json({ message: 'Not Authorized' })

		req.user = user
		next()
	} catch (error) {
		return res.status(401).json({ message: 'Not Authorized' })
	}
	next()
}
