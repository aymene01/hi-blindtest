import { NextFunction, Request, Response } from 'express'
import { Role } from '@prisma/client'

type Permitted = Role

export const authorize = (...permitted: Permitted[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { user } = req

		if (user && user.role && permitted.includes(user.role)) {
			return next()
		}
		res.status(403).json({ message: 'Forbidden' })
	}
}
