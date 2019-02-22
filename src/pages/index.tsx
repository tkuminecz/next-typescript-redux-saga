import * as React from 'react'
import Counter from '#/components/Counter'
import Link from 'next/link'

export default class HomePage extends React.Component {
  render () {
    return (
      <>
        <h1>next-typescript-redux-saga</h1>
        <Counter withControls={false}/>
        <Link href='/counter'><a>Counter page</a></Link>
      </>
    )
  }
}
