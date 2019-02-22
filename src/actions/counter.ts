import { all, call, put, takeEvery } from 'redux-saga/effects'
import { TypedAction, TypedReducer, setWith } from 'redoodle'

// Actions

export const Increment = TypedAction.defineWithoutPayload('[counter] increment')()

export const Decrement = TypedAction.defineWithoutPayload('[counter] decrement')()

export const IncrementThenDecrement = TypedAction.define('[counter] increment_then_decrement')<{ delay: number }>()

// State

export interface State {
  count: number
}

export const initialState: State = {
  count: 0
}

// Reducers

function createReducer () {
  const reducer = TypedReducer.builder<State>()

  reducer.withHandler(Increment.TYPE, (state) => {
    return setWith(state, {
      count: state.count + 1
    })
  })

  reducer.withHandler(Decrement.TYPE, (state) => {
    return setWith(state, {
      count: state.count - 1
    })
  })

  return reducer.build()
}

export const reducer = createReducer()

// Sagas

export function* saga () {
  yield all([
    takeEvery(IncrementThenDecrement.TYPE, incrementThenDecrementSaga)
  ])
}

function* incrementThenDecrementSaga (action: ReturnType<typeof IncrementThenDecrement.create>) {
  yield put(Increment.create())
  yield call(sleep, action.payload.delay)
  yield put(Decrement.create())
}

function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
