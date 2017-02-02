import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import './styles/bootstrap.css'
import './styles/reset.css'
import './styles/main.css'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const RootComp = <Root store={store} history={history} />
const RootNode = document.getElementById('root')

render( RootComp, RootNode )
