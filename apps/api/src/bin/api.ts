import { connectDatabase } from '@/database'
import { createServer } from '@/http/createServer'
import { logger } from 'toolbox/logger'
import { waitForSignal } from 'toolbox/os'
import { createIamService } from '@/iam/createIamService'
import { Logger } from 'pino'
import * as Env from './env'
import { createBusiness } from '@/business/createBusiness'

const api = async (logger: Logger) => {
	const database = connectDatabase({
		queryTimeout: Env.DATABASE_QUERY_TIMEOUT,
		connectionPoolSize: Env.DATABASE_CONNECTION_POOL_SIZE,
		databaseUrl: Env.DATABASE_URL,
		logger,
	})

	const iamService = createIamService({
		database,
		jwtDuration: Env.JWT_DURATION,
		jwtSecretKey: Env.JWT_SECRET,
	})

	const business = createBusiness({
		iamService,
		database,
	})

	const server = createServer({
		logger,
		business,
		keepAliveTimeout: Env.GRAPHQL_KEEP_ALIVE_TIMEOUT,
		listenAddr: Env.LISTEN_ADDR,
		mouthPath: Env.MOUNT_PATH,
	})

	await database.start()
	await server.start()
	await waitForSignal(['SIGINT', 'SIGTERM'])
	logger.info('🛑 Shutting down...')
	await server.stop()
	await database.stop()
}

api(logger).catch(err => {
	console.error(err)
	process.exit(1)
})
