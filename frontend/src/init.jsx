import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import App from './App'
import resources from './locales/index.js'
import { createSocket } from './services/socketConfig'
import { SocketContext } from './contexts/SocketContext'
import * as yup from 'yup'
import filter from 'leo-profanity'
import { Provider, ErrorBoundary } from '@rollbar/react'
import rollbarConfig from '../rollbar.config.js'

const init = async (token) => {
  const i18n = i18next.createInstance()
  const socket = createSocket(token)
  filter.loadDictionary('ru')
  filter.add(filter.getDictionary('en'))

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false
    }
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

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <SocketContext.Provider value={socket}>
            <App />
          </SocketContext.Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default init