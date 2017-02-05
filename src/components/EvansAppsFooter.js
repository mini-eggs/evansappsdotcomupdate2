import React from 'react'
import LoadingComp from './Loading'
import { Link } from 'react-router'
import { BaseURL } from '../routes'
import { connect } from 'react-redux'

const renderFooter = about => {
  return (
    <div
      className="text__center"
    >
      {
        about.links.map( (link, index) => {
          return (
            <Link 
              key={index} 
              href={link.url}
              className="tab__link"
              activeClassName="tab__link__active"
            >
              <i 
                className={link.icon} 
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
    <footer>
      { entries ? renderFooter( entries.about[0] ) : <LoadingComp/> }
    </footer>
  )
}

const getProps = state => {
  return { 
    entries: state.entries,
    routing: state.routing
  }
}

export default connect(getProps)(EvansAppsHeader)
