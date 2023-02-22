import type { Student, User, Teacher } from '@prisma/client'
import { Business } from '@/business/createBusiness'

export {}

type UserRequest = User

declare global {
	namespace Express {
		export interface Request {
			user: UserRequest
			business: Business
		}
	}
}
