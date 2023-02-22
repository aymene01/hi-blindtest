import { Options } from '@/business/types'
import { Request, Response } from 'express'

export const createUser = async (opts: Options, req: Request, res: Response) => opts.iamService.createUser(req, res)
