import React from 'react'
import { connect } from 'react-redux'
import { loadEntries } from '../actions'
import EvansAppsHeader from '../components/EvansAppsHeader'

const load = fn => {
  const style = { img: { opacity: 0 } }
  const loader = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  return (
    <img 
      role="presentation"
      style={style.img}
      onLoad={fn} 
      src={loader}
    />
  )
}

const container = children => {
  return (
    <div className="container-fluid">
      <div>
        <header>
          <nav>
            <EvansAppsHeader/>
          </nav>
        </header>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

const EvansAppsContainer = props => {
  return props.entries ? container(props.children) : load(props.loadEntries)
}

const getProps = state => {
  return { entries: state.entries }
}

export default connect(getProps, { loadEntries })(EvansAppsContainer)
