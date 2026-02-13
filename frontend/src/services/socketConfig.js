import { io } from 'socket.io-client'

const url = window.location.hostname !== 'localhost' 
    ? window.location.host 
    : 'localhost:5002'

export const createSocket = (token) => {
  return io(url, {
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
