import React from 'react'
import LoadingComp from './Loading'
import { Link } from 'react-router'
import { BaseURL } from '../routes'
import { connect } from 'react-redux'

const renderSidebar = tabs => {
  return (
    <div>
      {
        tabs.map( (tab, index) => {
          const url = tab.slug.indexOf('://') > -1 
            ? tab.slug 
            : BaseURL + tab.slug
          return (
            <Link 
              key={index} 
              to={url}
            >
              {tab.name}
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
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <div>
          Evans Jones
        </div>
        <div>
          web & app developer
        </div>
      </div>
      <div className="col-xs-12 col-sm-6 text-right">
        { entries ? renderSidebar( entries.tabs ) : <LoadingComp/> }
      </div>
    </div>
  )
}

const getProps = state => {
  return { entries: state.entries }
}

export default connect(getProps)(EvansAppsHeader)
