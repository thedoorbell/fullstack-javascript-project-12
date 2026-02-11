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

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery,
  tagTypes: ['Channel'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => ({
        url: '/channels',
      }),
      providesTags: ['Channel'],
    })
  }),
})

export const { useGetChannelsQuery } = channelsApi