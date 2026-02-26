import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider, ErrorBoundary } from '@rollbar/react'
import { Provider as ReduxProvider } from 'react-redux'
import filter from 'leo-profanity'
import * as yup from 'yup'

import App from './App'
import resources from './locales/index.js'
import store from './slices/index.js'
import rollbarConfig from '../rollbar.config.js'
import { createSocketHandlers } from './services/socketEventsHandlers.js'

const init = async (socket) => {
  const i18n = i18next.createInstance()
  const handlers = createSocketHandlers()

  filter.loadDictionary('ru')
  filter.add(filter.getDictionary('en'))

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })

  yup.setLocale({
    mixed: {
      required: i18n.t('errors.required'),
      notOneOf: i18n.t('errors.notOneOf'),
      oneOf: i18n.t('errors.oneOf'),
    },
    string: {
      min: ({ min }) => i18n.t('errors.min', { min }),
      max: ({ max }) => i18n.t('errors.max', { max }),
    },
  })

  socket.on('newMessage', handlers.handleNewMessage)
  socket.on('newChannel', handlers.handleNewChannel)
  socket.on('removeChannel', handlers.handleRemoveChannel)
  socket.on('renameChannel', handlers.handleRenameChannel)

  return (
    <ReduxProvider store={store}>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ErrorBoundary>
      </Provider>
    </ReduxProvider>
  )
}

export default init
