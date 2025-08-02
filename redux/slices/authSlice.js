import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
      // Set auth cookie for middleware
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        try {
          document.cookie = `auth-user=${JSON.stringify(action.payload)}; path=/; max-age=86400`
        } catch (error) {
          console.warn('Failed to set auth cookie:', error)
        }
      }
    },
    loginFailure: (state) => {
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      // Clear auth cookie
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        try {
          document.cookie = 'auth-user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        } catch (error) {
          console.warn('Failed to clear auth cookie:', error)
        }
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
