import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  token: string | null
  user: {
    id: string
    email: string
    role: string
    tenantId: string
    createdAt: string
  } | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
      if (action.payload) localStorage.setItem('token', action.payload)
      else localStorage.removeItem('token')
    },
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
  },
})

export const { setToken, setUser, logout } = authSlice.actions
export default authSlice.reducer


