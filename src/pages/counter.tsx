import * as React from 'react'
import Counter from '#/components/Counter'
import Link from 'next/link'

export default () => (
  <>
    <Link href='/'><a>Back to home</a></Link>
    <Counter/>
  </>
)
