import React from 'react'
import { directError } from '../actions/'
export { directError }
import { connect } from 'react-redux'
export { connect }
import { load } from '../containers/EvansAppsContainer'

const renderContent = content => {
  return <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
}

const renderItem = (item, error) => {
  return item ? renderContent( item.description ) : load( error )
}

const iterateItems = (item, find) => {
  return item.slug.toLowerCase().trim() === find.toLowerCase().trim()
}

const findItem = (items, find) => {
  return items.find( item => iterateItems( item, find ) )
}

export const EvansAppsItem = props => {
  return renderItem( findItem( props.items, props.routeParams[props.type] ), props.directError )
}

export const getProps = (state, type) => {
  return { 
    items: state.entries ? state.entries[ type ] : [],
    type
  }
}

const connector = state => {
  return getProps( state, 'page', )
}


export default connect(connector, { directError })(EvansAppsItem)
