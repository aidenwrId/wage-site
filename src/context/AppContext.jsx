import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [tokenBalance, setTokenBalance] = useState(5000)
  const [lockedTokens, setLockedTokens] = useState(0)

  const deductTokens = (amount) => {
    setTokenBalance(prev => prev - amount)
  }

  const addTokens = (amount) => {
    setTokenBalance(prev => prev + amount)
  }

  const lockTokens = (amount) => {
    setLockedTokens(prev => prev + amount)
  }

  const unlockTokens = (amount) => {
    setLockedTokens(prev => Math.max(0, prev - amount))
  }

  const availableTokens = tokenBalance - lockedTokens

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      tokenBalance,
      lockedTokens,
      availableTokens,
      deductTokens,
      addTokens,
      lockTokens,
      unlockTokens
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

