import { combineReducers } from 'redoodle'
import {
  State as CounterState,
  initialState as counterInitialState,
  reducer as counterReducer
} from '#/actions/counter'

export interface AppState {
  counter: CounterState
}

export const initialState: AppState = {
  counter: counterInitialState
}

export const reducers = combineReducers({
  counter: counterReducer
})
