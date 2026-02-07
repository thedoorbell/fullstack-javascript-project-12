import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    token: null,
    username: null,
    loggedIn: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, username } = action.payload
      state.token = token
      state.username = username
      state.loggedIn = true
      localStorage.setItem('token', token)
      localStorage.setItem('username', JSON.stringify(username))
    },
    logOut: (state) => {
      state.token = null
      state.username = null
      state.loggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

export const authInit = () => (dispatch) => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  
  if (token && username) {
    dispatch(setCredentials({
      token,
      username: JSON.parse(username),
    }))
  }
}

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer