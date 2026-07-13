'use client'

// Admin authentication context

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type AuthState = {
  token: string | null
  email: string | null
}

type AuthContextValue = AuthState & {
  setAuth: (token: string, email: string) => void
  clearAuth: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TOKEN_KEY = 'askrap_token'
const EMAIL_KEY = 'askrap_email'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>({ token: null, email: null })

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    const email = localStorage.getItem(EMAIL_KEY)
    if (token && email) {
      setAuthState({ token, email })
    }
  }, [])

  const setAuth = (token: string, email: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(EMAIL_KEY, email)
    setAuthState({ token, email })
  }

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EMAIL_KEY)
    setAuthState({ token: null, email: null })
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        setAuth,
        clearAuth,
        isAuthenticated: !!auth.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
