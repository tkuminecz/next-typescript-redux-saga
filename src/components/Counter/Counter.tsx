import * as React from 'react'
import { AppState } from '#/redux'
import { Increment, Decrement, IncrementThenDecrement } from '#/actions/counter'
import { connect } from 'react-redux'

interface OwnProps {
  delay?: number,
  withControls?: boolean
}

interface StateProps {
  count: number
}

interface ActionProps {
  increment: typeof Increment.create,
  decrement: typeof Decrement.create,
  incrementThenDecrement: typeof IncrementThenDecrement.create
}

const Counter = (props: OwnProps & StateProps & ActionProps) => {
  const { count, delay = 500, increment, decrement, incrementThenDecrement, withControls = true } = props
  return (
    <div>
      <p>Count: {count}</p>
      {withControls &&
        <div>
          <button onClick={() => increment()}>Increment</button>
          <button onClick={() => decrement()}>Decrement</button>
          <button onClick={() => incrementThenDecrement({ delay })}>Increment &raquo; Decrement</button>
        </div>}
    </div>
  )
}

export default connect<StateProps, ActionProps, OwnProps, AppState>(
  (state) => ({
    count: state.counter.count
  }),
  {
    increment: Increment.create,
    decrement: Decrement.create,
    incrementThenDecrement: IncrementThenDecrement.create
  }
)(Counter)
