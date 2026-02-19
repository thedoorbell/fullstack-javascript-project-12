import { createApi } from '@reduxjs/toolkit/query/react'
import getBaseQuery from './getBaseQuery'

const baseQuery = getBaseQuery()

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    logIn: builder.mutation({
      query: user => ({
        url: '/login',
        method: 'POST',
        body: user,
      })
    }),
    signUp: builder.mutation({
      query: user => ({
        url: '/signup',
        method: 'POST',
        body: user,
      })
    })
  }),
})

export const {
  useLogInMutation,
  useSignUpMutation,
} = authApi