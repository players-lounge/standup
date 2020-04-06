import App from 'next/app'
import React from 'react'
import Center from 'layouts/Center'
import Providers from 'utilities/providers'

class AppWrapper extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Providers>
        <Center maxWidth="1080px">
          <Component {...pageProps} />
        </Center>
      </Providers>
    )
  }
}

export default AppWrapper
