import * as brcypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Options } from './types'

const SALT_ROUNDS = 10

type JwtPayload = {
	uuid: string
	email: string
}

type VerifyJwt = Omit<JwtPayload, 'email'>

export const hashPassword = async (password: string) => {
	return await brcypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = async (password: string, hash: string) => {
	return await brcypt.compare(password, hash)
}

export const generateToken = (opts: Options, payload: JwtPayload) => {
	return jwt.sign(payload, opts.jwtSecretKey, { expiresIn: opts.jwtDuration })
}

export const verifyJwt = (opts: Options, token: string): VerifyJwt => {
	const decoded = jwt.verify(token, opts.jwtSecretKey) as JwtPayload
	if (!decoded.uuid) {
		throw new Error('Invalid token')
	}
	return { uuid: decoded.uuid }
}
