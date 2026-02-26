import { createRoot } from 'react-dom/client'
import './scss/styles.scss'

import init from './init'
import { createSocket } from './services/socketConfig'

const app = async () => {
  const token = localStorage.getItem('token')
  const socket = createSocket(token)

  createRoot(document.getElementById('root')).render(await init(socket))
}

app()
