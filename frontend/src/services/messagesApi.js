import { createApi } from '@reduxjs/toolkit/query/react'
import getBaseQuery from './getBaseQuery'
import routes from '../routes'

const baseQuery = getBaseQuery()

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,

  endpoints: builder => ({
    getMessages: builder.query({
      query: () => ({
        url: routes.messagesPath(),
      }),
    }),
    addNewMessage: builder.mutation({
      query: message => ({
        url: routes.messagesPath(),
        method: 'POST',
        body: message,
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useAddNewMessageMutation,
} = messagesApi
