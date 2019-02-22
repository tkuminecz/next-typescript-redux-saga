import { all, call } from 'redux-saga/effects'
import { saga as counterSaga } from '#/actions/counter'

export default function* rootSaga () {
  yield all([
    call(counterSaga)
  ])
}
