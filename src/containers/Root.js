import React from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import DevTools from './DevTools'
import { Router } from 'react-router'

const Root = ({ store, history }) => {

  const dev = process.env.NODE_ENV === 'production' 
    ?
    null
    :
    <DevTools/>

  return (
    <Provider store={store}>
      <div>
        <Router history={history} routes={routes} />
        {dev}
      </div>
    </Provider>
  )
}

export default Root
