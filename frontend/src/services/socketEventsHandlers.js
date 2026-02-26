import store from '../slices/index.js'
import { messagesApi } from '../services/messagesApi'
import { channelsApi } from '../services/channelsApi'
import { setActiveChannelId } from '../slices/uiSlice.js'

export const createSocketHandlers = () => {
  const handleNewMessage = (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
        draftMessages.push(payload)
      }),
    )
  }

  const handleNewChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        draftChannels.push(payload)
      }),
    )
  }

  const handleRemoveChannel = (payload) => {
    const state = store.getState()
    const channels = channelsApi.endpoints.getChannels.select()(state).data

    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        return draftChannels.filter(c => c.id !== payload.id)
      }),
    )

    if (payload.id === state.ui.activeChannelId) {
      store.dispatch(setActiveChannelId(channels[0].id))
    }
  }

  const handleRenameChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        const channel = draftChannels.find(c => c.id === payload.id)
        if (channel) {
          channel.name = payload.name
        }
      }),
    )
  }

  return {
    handleNewMessage,
    handleNewChannel,
    handleRemoveChannel,
    handleRenameChannel,
  }
}
