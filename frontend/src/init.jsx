import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import App from './App'
import resources from './locales/index.js'
import { createSocket } from './services/socketConfig'
import { SocketContext } from './contexts/SocketContext'

const init = async (token) => {
  const i18n = i18next.createInstance()
  const socket = createSocket(token)

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    })

  return (
    <I18nextProvider i18n={i18n}>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </I18nextProvider>
  )
}

export default init