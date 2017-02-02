import React from 'react'

export default class extends React.Component {
  componentDidMount () {
    alert( 'Oops, an error has occurred' )
  }
  render () {
    return (
      <span>
        Error
      </span>
    )
  }
}
