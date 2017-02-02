import React from 'react'
import { connect } from 'react-redux'

const EvansAppsBlog = props => {
  return (
    <div>
      main blog page
    </div>
  )
}

export default connect( state => state, {
  // actions or something here
} )(EvansAppsBlog)
