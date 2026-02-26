import { io } from 'socket.io-client'
import routes from '../routes'

export const createSocket = (token) => {
  return io(routes.mainPath(), {
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 5000,
    withCredentials: true,
    auth: { token },
  })
}
