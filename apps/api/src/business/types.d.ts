import { Database } from '@/database'
import { IamService } from '@/iam/createIamService'

export type Options = {
	database: Database
	iamService: IamService
}
