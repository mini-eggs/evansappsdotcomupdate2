import React from 'react'
import { connect } from 'react-redux'
import LoadingComp from '../components/Loading'
import { loadEntries } from '../actions'
import EvansAppsHeader from '../components/EvansAppsHeader'
import EvansAppsFooter from '../components/EvansAppsFooter'

const load = props => {
  props.loadEntries()
}

class EvansAppsContainer extends React.Component {

  componentDidMount () {
    load( this.props )
  }

  renderData (props) {
    return (
      <div className="container">
        <div className="container__inner">
          <EvansAppsHeader/>
          <div className="content__container">
            { this.props.children }
          </div>
          <EvansAppsFooter/>
        </div>
      </div>
    )
  }

  render () {
    const { entries } = this.props
    return entries ? this.renderData(this.props) : <LoadingComp/>
  }
}

const getProps = state => {
  return { entries: state.entries }
}

export default connect(getProps, { loadEntries })(EvansAppsContainer)
