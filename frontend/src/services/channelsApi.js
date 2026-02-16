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
  tagTypes: ['Channels'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => ({
        url: '/channels',
      }),
      providesTags: ['Channels'],
    }),
    addNewChannel: builder.mutation({
      query: channel => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
    })
  }),
})

export const {
  useGetChannelsQuery,
  useAddNewChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi