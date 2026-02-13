import { io } from 'socket.io-client'

export const createSocket = (token) => {
  return io('http://localhost:5002', {
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 5000,
    withCredentials: true,
    auth: { token }
  })
}
