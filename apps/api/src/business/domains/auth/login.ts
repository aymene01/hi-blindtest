import { Options } from '@/business/types'
import { Request, Response } from 'express'

export const login = (opts: Options, req: Request, res: Response) => opts.iamService.login(req, res)
