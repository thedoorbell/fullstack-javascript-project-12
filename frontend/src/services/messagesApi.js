import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers
  },
})

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,
  tagTypes: ['Messages'],
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => ({
        url: '/messages',
      }),
      providesTags: ['Messages'],
    }),
    addNewMessage: builder.mutation({
      query: message => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    })
  }),
})

export const {
  useGetMessagesQuery,
  useAddNewMessageMutation
} = messagesApi