import { Server } from 'socket.io'
import * as http from 'http'

export const createSocketServer = (httpServer: http.Server) => {
	const io = new Server(httpServer, {
		cors: {
			origin: '*',
		},
	})

	//TODO: Create a lib to split logic from socket server based on file system

	io.on('connection', socket => {
		console.log('a user connected')
		socket.on('disconnect', () => {
			console.log('user disconnected')
		})

		socket.emit('chat-message', 'Hello there from server')
	})

	io.on('connection', socket => {
		socket.on('chat-message', msg => {
			console.log('message: ' + msg)
		})
	})

	io.on('connection', socket => {
		socket.on('join-room', room => {
			socket.join(room)
			console.log(` ${socket.id} joined the room ${room}`)
			socket.to(room).emit('user-connected', { message: ` ${socket.id} joined the room` })
		})
	})
}
