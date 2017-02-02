import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import EvansAppsContainer from './containers/EvansAppsContainer'
import EvansAppsPage from './components/EvansAppsPage'
import EvansAppsPost from './components/EvansAppsPost'
import EvansAppsBlog from './components/EvansAppsBlog'

export const BaseURL = '/evansapps'

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
      path={`${BaseURL}/blog/:blog`} 
      component={EvansAppsPost} 
    />
    <Route 
      path={`${BaseURL}/blog`} 
      component={EvansAppsBlog} 
    />
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
