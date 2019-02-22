import '#/static/styles/global.scss'
import * as React from 'react'
import App, { Container } from 'next/app'
import { AnyAction, Store } from 'redux'
import { AppState, configureStore } from '#/redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider as ReduxProvider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '#/pageContext'
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

  pageContext = getPageContext()

  componentDidMount () {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <ReduxProvider store={store}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline/>
              <Component pageContext={this.pageContext} {...pageProps} />
            </MuiThemeProvider>
          </JssProvider>
        </ReduxProvider>
      </Container>
    )
  }

}

export default withRedux(configureStore, { debug: false })(withReduxSaga(MyApp))
