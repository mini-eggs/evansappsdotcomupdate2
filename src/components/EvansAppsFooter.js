import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const renderFooterLinks = (link, index) => {
  return (
    <div key={index}>
      <Link href={link.url}>
        <h6>
          {link.name}
        </h6>
      </Link>
    </div>
  )
}

const EvansAppsHeader = data => {
  return (
    <div>
      {data.links.map(renderFooterLinks)}
    </div>
  )
}

const getProps = state => {
  return { links: state.entries ? state.entries.about[0].links : [] }
}

export default connect(getProps)(EvansAppsHeader)
