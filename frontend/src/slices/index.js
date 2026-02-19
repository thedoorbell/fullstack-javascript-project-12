import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import uiReducer from './uiSlice.js'
import { channelsApi } from '../services/channelsApi.js'
import { messagesApi } from '../services/messagesApi.js'
import { authApi } from '../services/authApi.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      channelsApi.middleware,
      messagesApi.middleware,
      authApi.middleware,
    ),
})
