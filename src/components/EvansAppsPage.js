import React from 'react'
import { connect } from 'react-redux'

export const renderPage = page => {
  return typeof page !== 'undefined' ? <div className="content" dangerouslySetInnerHTML={{ __html: page.description }} /> : null
}

const iteratorPages = (page, find) => {
  return page.slug.toLowerCase().trim() === find.toLowerCase().trim()
}

export const findPage = (pages, find) => {
  return pages.find( page => iteratorPages( page, find ) )
}

const EvansAppsPage = props => {
  return renderPage( findPage( props.pages, props.routeParams.page ) )
}

const getProps = state => {
  return { pages: state.entries ? state.entries.page : [] }
}

export default connect(getProps)(EvansAppsPage)
