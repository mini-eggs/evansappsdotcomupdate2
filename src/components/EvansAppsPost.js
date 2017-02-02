import React from 'react'
import { connect } from 'react-redux'

class EvansAppsPost extends React.Component {
  render () {
    return (
      <div>
        single blog post
      </div>
    )
  }
}

export default connect( state => state, {
  // actions or something here
} )(EvansAppsPost)
