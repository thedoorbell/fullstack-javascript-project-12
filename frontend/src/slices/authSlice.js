import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    username: null,
    loading: true,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, username } = action.payload
      state.token = token
      state.username = username
      state.loading = false
      localStorage.setItem('token', token)
      localStorage.setItem('username', JSON.stringify(username))
    },
    logOut: (state) => {
      state.token = null
      state.username = null
      state.loading = false
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const authInit = () => (dispatch) => {
  dispatch(setLoading(true))
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  if (token && username) {
    dispatch(setCredentials({
      token,
      username: JSON.parse(username),
    }))
  }

  dispatch(setLoading(false))
}

export const { setCredentials, logOut, setLoading } = authSlice.actions
export default authSlice.reducer
