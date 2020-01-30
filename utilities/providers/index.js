// Providers.tsx
import React, { useEffect, useState } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import useDarkMode from 'use-dark-mode'
import globalCss from 'utilities/global-css'

const lightTheme = {
  colors: {
    background: '#ffffff',
    border: '#000000',
    primary: '#000000',
    highlight: 'lightgreen',
  },
  spacing: {
    base: '1rem'
  },
}

const darkTheme = {
  colors: {
    background: '#000000',
    border: '#eeeeee',
    primary: '#eeeeee',
    highlight: 'darkgreen',
  },
  spacing: {
    base: '1rem'
  },
}

const GlobalCSS = createGlobalStyle`
  ${globalCss}
  body {
    background-color: ${({ theme }) => theme.colors.background}
  }
`

export default ({ children }) => {
  const { value } = useDarkMode(false, { storageKey: null, onChange: null })
  const theme = value ? darkTheme : lightTheme

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const body = (
    <ThemeProvider theme={theme}>
      <GlobalCSS />
      {children}
    </ThemeProvider>
  )

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}
