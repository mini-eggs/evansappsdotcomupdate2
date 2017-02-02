import React from 'react'
import ErrorComp from './Error'
import LoadingComp from './Loading'
import { connect } from 'react-redux'

const renderPage = page => {
  return (
    <div dangerouslySetInnerHTML={{ __html: page.description }} />
  )
}

const findPage = ( pages, page ) => {
  let currentPage = false
  pages.forEach( aPage => {
    if( aPage.slug.toLowerCase().trim() === page.toLowerCase().trim() ) {
      currentPage = aPage
    }
  })
  return currentPage ? renderPage( currentPage ) : <ErrorComp/>
}

const EvansAppsPage = props => {
  const { pages, routeParams } = props
  return (
    <div>
      {
        pages ? findPage( pages, routeParams.page ) : <LoadingComp/>
      }
    </div>
  )
}

const getProps = state => {
  return { pages: state.entries ? state.entries.page : state.entries }
}

export default connect(getProps)(EvansAppsPage)
