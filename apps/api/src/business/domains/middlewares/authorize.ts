import { Request, Response, NextFunction } from 'express'
import { Options } from '@/business/types'
import { Role } from '@prisma/client'

type Permitted = Role

export const authorize =
	(opts: Options, ...permitted: Permitted[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		return opts.iamService.authorize(...permitted)(req, res, next)
	}
