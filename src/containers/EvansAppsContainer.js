import React from 'react'
import { connect } from 'react-redux'
import { loadEntries } from '../actions'
import EvansAppsHeader from '../components/EvansAppsHeader'

class EvansAppsContainer extends React.Component {

  componentDidMount () {
    this.props.loadEntries()
  }

  render () {
    return (
      <div className="container">
        <EvansAppsHeader/>
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default connect(null, { loadEntries })(EvansAppsContainer)
