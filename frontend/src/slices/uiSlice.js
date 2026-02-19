import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeChannelId: null,
    modalInfo: { type: null, item: null },
  },
  reducers: {
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload
    },
    setModalInfo: (state, action) => {
      state.modalInfo = action.payload
    },
  }
})

export const { setActiveChannelId, setModalInfo } = uiSlice.actions
export default uiSlice.reducer