import { EvansAppsItem, getProps, directError, connect } from './EvansAppsPage'

const connector = state => {
  return getProps( state, 'blogPost', )
}

export default connect(connector, { directError })(EvansAppsItem)
