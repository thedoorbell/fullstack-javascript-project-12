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