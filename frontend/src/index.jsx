import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './scss/styles.scss'

import init from './init'
import store from './slices/index.js'

const app = async () => {
  const token = localStorage.getItem('token')
  
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        {await init(token)}
      </Provider>
    </StrictMode>
  )
}

app()