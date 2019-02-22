import { AppState, initialState, reducers } from './reducers'
import { applyMiddleware, compose, createStore, Reducer } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { reduceCompoundActions } from 'redoodle'
import createSagaMiddleware from 'redux-saga'
import localforage from 'localforage'
// import nextReduxSaga from 'next-redux-saga'
import rootSaga from './sagas'
// import withReduxWrapper from 'next-redux-wrapper'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function,
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function
  }
}

function configureReducer<S> (isServer: boolean, rootReducer: Reducer<S>): Reducer<S> {
  if (!isServer) {
    return persistReducer(
      {
        key: 'root',
        version: 0,
        storage: localforage,
        whitelist: []
      },
      reduceCompoundActions(rootReducer)
    )
  }

  return reduceCompoundActions(rootReducer)
}

const composeEnhancers = (typeof window !== 'undefined') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

interface MakeStoreOpts {
  isServer: boolean
}

export function configureStore (stateFromServer: AppState, opts: MakeStoreOpts) {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    configureReducer(opts.isServer, reducers),
    stateFromServer || initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    )
  )

  // redux persistence to local storage
  ;(store as any).__persister = persistStore(store)

  // start saga middleware
  ;(store as any).sagaTask = sagaMiddleware.run(rootSaga)

  return store
}
