import { Database } from '@/database'

export type Options = {
	database: Database
	jwtSecretKey: string

	// In seconds
	jwtDuration: number
}
