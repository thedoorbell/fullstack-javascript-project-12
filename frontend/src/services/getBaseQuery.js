import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes from '../routes'

const getBaseQuery = () => fetchBaseQuery({
  baseUrl: routes.apiPath(),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export default getBaseQuery
