import { partial } from 'lodash'
import { createUser } from './domains/auth/createUser'
import { login } from './domains/auth/login'
import { authenticate } from './domains/middlewares/authenticate'
import { authorize } from './domains/middlewares/authorize'
import { createStudent } from './domains/createStudent'
import { Options } from './types'

export const createBusiness = (opts: Options) => {
	return {
		createUser: partial(createUser, opts),
		login: partial(login, opts),
		authenticate: partial(authenticate, opts),
		authorize: partial(authorize, opts),
		createStudent: partial(createStudent, opts),
	}
}

export type Business = ReturnType<typeof createBusiness>
