import { createApi } from '@reduxjs/toolkit/query/react'
import getBaseQuery from './getBaseQuery'

const baseQuery = getBaseQuery()

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => ({
        url: '/messages',
      }),
    }),
    addNewMessage: builder.mutation({
      query: message => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
    })
  }),
})

export const {
  useGetMessagesQuery,
  useAddNewMessageMutation
} = messagesApi