import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import contentful from '../middleware/contentful'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

const configureStore = preloadedState => {

  const composed = process.env.NODE_ENV === 'production'
    ? 
    compose(
      applyMiddleware(thunk, contentful)
    )
    :
    compose(
      applyMiddleware(thunk, contentful, createLogger()),
      DevTools.instrument()
    )

  const store = createStore(
    rootReducer,
    preloadedState,
    composed
  )

  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
