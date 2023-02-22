import { Options } from '@/business/types'
import { Request, Response } from 'express'

export const createStudent = async (opts: Options, req: Request, res: Response) => {
	const { user } = req
	const { name } = req.body

	if (user.student) return res.status(400).json({ message: 'User already has a student profile' })

	const student = await opts.database.prisma.student.create({
		data: {
			name,
			userUuid: user.uuid,
		},
	})

	res.json(student)
}
