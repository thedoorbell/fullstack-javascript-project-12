import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { activeChannelId: null },
  reducers: {
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload
    }
  }
})

export const { setActiveChannelId } = uiSlice.actions
export default uiSlice.reducer