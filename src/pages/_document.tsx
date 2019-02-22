import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {

  static getInitialProps (ctx: any) {
    let pageContext: any
    const page = ctx.renderPage((Component: any) => {
      return (props: any) => {
        pageContext = props.pageContext
        return <Component {...props}/>
      }
    })

    let css = ''
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString()
    }

    return {
      ...page,
      pageContext,
      styles: (
        <>
          <style
            id='jss-server-side'
            dangerouslySetInnerHTML={{ __html: css }}
          />
          {flush() || null}
        </>
      )
    }
  }

  render () {
    return (
      <html>
        <Head>
          <meta charSet='utf-8'/>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'/>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'/>
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }

}
