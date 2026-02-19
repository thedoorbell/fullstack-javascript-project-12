import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getBaseQuery = () => fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export default getBaseQuery