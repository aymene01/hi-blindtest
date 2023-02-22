import { partial } from 'lodash'
import { createUser } from './createUser'
import { login } from './login'
import { authenticate } from './authenticate'
import { authorize } from './authorize'
import { Options } from './types'

export const createIamService = (opts: Options) => {
	return {
		createUser: partial(createUser, opts),
		login: partial(login, opts),
		authenticate: partial(authenticate, opts),
		authorize,
	}
}

export type IamService = ReturnType<typeof createIamService>
