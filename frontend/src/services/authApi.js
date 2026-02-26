import { createApi } from '@reduxjs/toolkit/query/react'
import getBaseQuery from './getBaseQuery'
import routes from '../routes'

const baseQuery = getBaseQuery()

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    logIn: builder.mutation({
      query: user => ({
        url: routes.loginPath(),
        method: 'POST',
        body: user,
      }),
    }),
    signUp: builder.mutation({
      query: user => ({
        url: routes.signUpPath(),
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const {
  useLogInMutation,
  useSignUpMutation,
} = authApi
