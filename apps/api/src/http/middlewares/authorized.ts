import { Role } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

type Permitted = Role

export const authorize = (...permitted: Permitted[]) => {
	return (req: Request, res: Response, next: NextFunction) => req.business.authorize(...permitted)(req, res, next)
}
