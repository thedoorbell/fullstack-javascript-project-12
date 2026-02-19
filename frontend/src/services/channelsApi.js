import { createApi } from '@reduxjs/toolkit/query/react'
import getBaseQuery from './getBaseQuery'

const baseQuery = getBaseQuery()

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
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddNewChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi
