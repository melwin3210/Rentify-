"use client"

import { Provider } from "react-redux"
import { useEffect } from "react"
import { store } from "@/redux/store"
import { loginSuccess } from "@/redux/slices/authSlice"
import { ThemeProvider } from "@/components/theme-provider"

function AuthRehydrator({ children }) {
  useEffect(() => {
    // Restore auth state from cookie on app load
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        const authCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth-user='))
        
        if (authCookie) {
          const userData = JSON.parse(decodeURIComponent(authCookie.split('=')[1]))
          store.dispatch(loginSuccess(userData))
        }
      } catch (error) {
        console.warn('Failed to restore auth state:', error)
      }
    }
  }, [])

  return children
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthRehydrator>
          {children}
        </AuthRehydrator>
      </ThemeProvider>
    </Provider>
  )
}
