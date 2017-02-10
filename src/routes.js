import React from 'react'
import { Route, IndexRedirect, IndexRoute } from 'react-router'
import EvansAppsContainer from './containers/EvansAppsContainer'
import EvansAppsPage from './components/EvansAppsPage'
import EvansAppsPost from './components/EvansAppsPost'
import EvansAppsBlog from './components/EvansAppsBlog'

export const BaseURL = ''

const routes = (
  <Route 
    path={`/`} 
    component={EvansAppsContainer}
  >
    <IndexRedirect 
      to={`${BaseURL}/page/home`} 
    />
    <Route 
      path={`${BaseURL}/page/:page`} 
      component={EvansAppsPage} 
    />
    <Route
      path={`${BaseURL}/blog`}
    >
      <IndexRoute
        component={EvansAppsBlog} 
      />
      <Route
        path={':blogPost'}
        component={EvansAppsPost} 
      />
    </Route>
    <Route 
      path={`*`}
    >
      <IndexRedirect 
        to={`${BaseURL}/page/home`} 
      />
    </Route>
  </Route>
)

export default routes
