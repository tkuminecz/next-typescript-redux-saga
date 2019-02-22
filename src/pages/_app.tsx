import '#/static/styles/global.scss'
import * as React from 'react'
import App, { Container } from 'next/app'
import { AnyAction, Store } from 'redux'
import { AppState, configureStore } from '#/redux'
import { Provider as ReduxProvider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

interface Props {
  store: Store<AppState, AnyAction>
}

class MyApp extends App<Props> {

  static async getInitialProps ({ Component, ctx }) {
    const pageProps = (Component.getInitialProps)
      ? await Promise.resolve(Component.getInitialProps(ctx))
      : {}
    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <ReduxProvider store={store}>
          <Component {...pageProps} />
        </ReduxProvider>
      </Container>
    )
  }

}

export default withRedux(configureStore, { debug: false })(withReduxSaga(MyApp))
