import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const channelsAdapter = createEntityAdapter()
const initialState = channelsAdapter.getInitialState({ activeChannel: '' })

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload
    }
  }
})

export const { addChannel, addChannels, setActiveChannel } = channelsSlice.actions
export const channelsSelectors = channelsAdapter.getSelectors(state => state.channels)
export default channelsSlice.reducer