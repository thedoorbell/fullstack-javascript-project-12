import { createApi } from '@reduxjs/toolkit/query/react'
import getBaseQuery from './getBaseQuery'
import routes from '../routes'

const baseQuery = getBaseQuery()

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery,
  tagTypes: ['Channels'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => ({
        url: routes.channelsPath(),
      }),
      providesTags: ['Channels'],
    }),
    addNewChannel: builder.mutation({
      query: channel => ({
        url: routes.channelsPath(),
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: `${routes.channelsPath()}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `${routes.channelsPath()}/${id}`,
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
