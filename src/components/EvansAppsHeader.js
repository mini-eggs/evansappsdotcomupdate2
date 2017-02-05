import React from 'react'
import LoadingComp from './Loading'
import { Link } from 'react-router'
import { BaseURL } from '../routes'
import { connect } from 'react-redux'

const renderMenu = tabs => {
  return (
    <div
      className="text__center"
    >
      {
        tabs.map( (tab, index) => {
          const url = tab.slug.indexOf('://') > -1 
            ? tab.slug 
            : BaseURL + tab.slug
          const type = tab.slug.indexOf('://') > -1 
            ? { href: url }
            : { to: url }
          return (
            <Link 
              key={index} 
              {...type}
              className="tab__link"
              activeClassName="tab__link__active"
            >
              <i 
                className={tab.icon} 
                aria-hidden="true"
              />
            </Link>
          )
        })
      }
    </div>
  )
}

const EvansAppsHeader = props => {
  const { entries } = props  
  return (
    <div>
      { entries ? renderMenu( entries.tabs ) : <LoadingComp/> }
    </div>
  )
}

const getProps = state => {
  return { 
    entries: state.entries,
    routing: state.routing
  }
}

export default connect(getProps)(EvansAppsHeader)
