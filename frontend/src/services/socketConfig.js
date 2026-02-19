import { io } from 'socket.io-client'

//const url = window.location.hostname

export const createSocket = (token) => {
  return io('/', {
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
