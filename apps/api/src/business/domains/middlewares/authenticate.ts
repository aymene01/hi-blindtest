import { Options } from '@/business/types'
import { Request, Response, NextFunction } from 'express'

export const authenticate = (opts: Options, req: Request, res: Response, next: NextFunction) =>
	opts.iamService.authenticate(req, res, next)
