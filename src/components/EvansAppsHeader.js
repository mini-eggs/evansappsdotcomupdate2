import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const renderTab = (tab, index) => {
  const slug = tab.slug || tab.url
  const attribute = slug.indexOf('http') > -1 ? 'href' : 'to'
  const link = {}
  link[ attribute ] = slug
  return <Link key={index} {...link} className="link" activeClassName="link__active">{tab.name}</Link>
}

const EvansAppsHeader = data => {
  return (
    <div className="nav__container">
      {data.tabs.map(renderTab)}
    </div>
  )
}

const getProps = state => {
  return {
    tabs: state.entries ? [ ...state.entries.tabs, ...state.entries.about[0].links ] : [],
    routing: state.routing
  }
}

export default connect(getProps)(EvansAppsHeader)
