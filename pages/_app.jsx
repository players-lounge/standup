import App from 'next/app'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import globalCss from 'utilities/global-css'

const theme = {
  colors: {
    background: '#fff',
    primary: '#0070f3',
  },
}

class AppWrapper extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const GlobalCSS = createGlobalStyle`
      ${globalCss}
      body {
        background-color: ${({ theme }) => theme.colors.background}
      }
    `

    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalCSS />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

export default AppWrapper
