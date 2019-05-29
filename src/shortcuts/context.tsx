import React, { createContext, useState, ReactChild } from 'react'

// it returns two components Provider and Consumer
export const ShortcutContext = createContext({
  shortcut: false,
  setShortcut: (event: Event) => {},
})

export function ShortcutProvider({ children }: { children: ReactChild }) {
  const [shortcut, setShortcut] = useState('')

  return (
    <ShortcutContext.Provider value={{ shortcut, setShortcut }}>
      {children}
    </ShortcutContext.Provider>
  )
}
