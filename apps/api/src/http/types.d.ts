import { Logger } from '@/toolbox/logger'
import { Business } from '@/business/createBusiness'

export type Options = {
	logger: Logger
	business: Business
	keepAliveTimeout: number
	listenAddr: { host: string; port: number }
	keepAliveTimeout: number
	mouthPath: string
}
