import { connect } from 'react-redux'
import { renderPage, findPage } from './EvansAppsPage'

const EvansAppsPost = props => {
  return renderPage( findPage( props.pages, props.routeParams.blog ) )
}

const getProps = state => {
  return { pages: state.entries ? state.entries.blogPost : [] }
}

export default connect(getProps)(EvansAppsPost)
